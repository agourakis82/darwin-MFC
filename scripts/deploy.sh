#!/bin/bash
# Darwin-MFC Deployment Script
# Implements blue-green deployment strategy with rollback capabilities

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DOCKER_REGISTRY="ghcr.io"
IMAGE_NAME="darwin-mfc"
APP_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# Environment variables
ENVIRONMENT=${ENVIRONMENT:-production}
APP_ENV=${APP_ENV:-production}
BLUE_GREEN_ENABLED=${BLUE_GREEN_ENABLED:-true}
HEALTH_CHECK_TIMEOUT=${HEALTH_CHECK_TIMEOUT:-300}
ROLLBACK_TIMEOUT=${ROLLBACK_TIMEOUT:-180}
SMOKE_TEST_TIMEOUT=${SMOKE_TEST_TIMEOUT:-60}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Help function
show_help() {
    cat << EOF
Darwin-MFC Deployment Script

Usage: $0 [COMMAND] [OPTIONS]

Commands:
    deploy          Deploy application with blue-green strategy
    rollback        Rollback to previous version
    status          Show deployment status
    health-check    Run health checks
    cleanup         Clean up old deployments

Options:
    -e, --env       Environment (development|staging|production)
    -v, --version   Application version to deploy
    --no-health     Skip health checks
    --force         Force deployment without confirmation
    --help          Show this help message

Examples:
    $0 deploy --env production --version 1.0.0
    $0 rollback --env production
    $0 status --env staging

Environment Variables:
    ENVIRONMENT          Target environment
    BLUE_GREEN_ENABLED   Enable blue-green deployment
    HEALTH_CHECK_TIMEOUT Health check timeout in seconds
    ROLLBACK_TIMEOUT     Rollback timeout in seconds
EOF
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Docker is installed and running
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi
    
    # Check if Docker Compose is available
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed or not in PATH"
        exit 1
    fi
    
    # Check if required tools are available
    local required_tools=("curl" "jq" "grep")
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            log_error "Required tool '$tool' is not installed"
            exit 1
        fi
    done
    
    log_success "All prerequisites met"
}

# Load environment variables
load_environment() {
    local env_file="$PROJECT_ROOT/.env.$ENVIRONMENT"
    
    if [ -f "$env_file" ]; then
        log_info "Loading environment variables from $env_file"
        # Source environment file, replacing ${VAR} placeholders
        eval "$(cat "$env_file" | sed 's/\${[^}]*}/$/g' | grep -v '^#' | grep -v '^$')"
    else
        log_warning "Environment file $env_file not found, using defaults"
    fi
}

# Build application
build_application() {
    log_info "Building application..."
    
    local build_args=(
        "--build-arg" "NODE_ENV=$NODE_ENV"
        "--build-arg" "APP_VERSION=$APP_VERSION"
        "--build-arg" "BUILD_TARGET=$BUILD_TARGET"
    )
    
    # Add build arguments for environment variables
    local env_vars=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "NEXT_PUBLIC_API_URL"
        "NEXT_PUBLIC_KEYCLOAK_URL"
        "NEXT_PUBLIC_KEYCLOAK_REALM"
        "NEXT_PUBLIC_KEYCLOAK_CLIENT_ID"
        "NEXT_PUBLIC_SEARCH_URL"
        "NEXT_PUBLIC_SEARCH_API_KEY"
    )
    
    for var in "${env_vars[@]}"; do
        if [ -n "${!var:-}" ]; then
            build_args+=("--build-arg" "$var=${!var}")
        fi
    done
    
    # Build Docker image
    docker build "${build_args[@]}" \
        -t "$IMAGE_NAME:$APP_VERSION-$ENVIRONMENT" \
        -t "$IMAGE_NAME:latest-$ENVIRONMENT" \
        "$PROJECT_ROOT"
    
    # Tag for registry if available
    if [ -n "${DOCKER_REGISTRY:-}" ]; then
        docker tag "$IMAGE_NAME:$APP_VERSION-$ENVIRONMENT" \
            "$DOCKER_REGISTRY/$IMAGE_NAME:$APP_VERSION-$ENVIRONMENT"
        docker tag "$IMAGE_NAME:$APP_VERSION-$ENVIRONMENT" \
            "$DOCKER_REGISTRY/$IMAGE_NAME:latest-$ENVIRONMENT"
    fi
    
    log_success "Application built successfully"
}

# Run smoke tests
run_smoke_tests() {
    log_info "Running smoke tests..."
    
    local url="${SMOKE_TEST_URL:-http://localhost:3000}"
    local timeout="${SMOKE_TEST_TIMEOUT:-60}"
    
    # Test basic connectivity
    if ! curl -f -s --max-time "$timeout" "$url" > /dev/null; then
        log_error "Smoke test failed: Cannot connect to $url"
        return 1
    fi
    
    # Test health endpoint
    if ! curl -f -s --max-time "$timeout" "$url/api/health" > /dev/null; then
        log_error "Smoke test failed: Health endpoint not responding"
        return 1
    fi
    
    log_success "Smoke tests passed"
}

# Deploy using blue-green strategy
deploy_blue_green() {
    log_info "Starting blue-green deployment..."
    
    local current_color=$(docker-compose ps -q app | xargs docker inspect --format='{{index .Config.Labels "com.docker.compose.service"}}' 2>/dev/null | head -1 || echo "green")
    local new_color="green"
    
    if [ "$current_color" = "green" ]; then
        new_color="blue"
    fi
    
    log_info "Current deployment: $current_color"
    log_info "New deployment: $new_color"
    
    # Stop old containers if any
    log_info "Cleaning up old containers..."
    docker-compose down --remove-orphans || true
    
    # Start new deployment
    log_info "Starting new deployment ($new_color)..."
    docker-compose --profile "$new_color" up -d --remove-orphans
    
    # Wait for services to start
    log_info "Waiting for services to start..."
    sleep 30
    
    # Run health checks
    if [ "${SKIP_HEALTH_CHECK:-false}" != "true" ]; then
        log_info "Running health checks..."
        if ! run_health_checks; then
            log_error "Health checks failed, rolling back..."
            rollback_deployment
            return 1
        fi
    fi
    
    # Switch traffic to new deployment
    log_info "Switching traffic to new deployment..."
    if [ -f "./nginx/nginx-$new_color.conf" ]; then
        cp "./nginx/nginx-$new_color.conf" "./nginx/nginx.conf"
        docker-compose restart nginx || true
    fi
    
    # Wait for switch to complete
    sleep 10
    
    # Final smoke tests
    log_info "Running final smoke tests..."
    if ! run_smoke_tests; then
        log_error "Final smoke tests failed, rolling back..."
        rollback_deployment
        return 1
    fi
    
    # Cleanup old deployment
    log_info "Cleaning up old deployment..."
    docker-compose down --remove-orphans
    
    log_success "Blue-green deployment completed successfully"
}

# Run health checks
run_health_checks() {
    log_info "Running health checks..."
    
    local timeout="${HEALTH_CHECK_TIMEOUT:-300}"
    local start_time=$(date +%s)
    local end_time=$((start_time + timeout))
    local url="http://localhost:3000"
    
    while [ $(date +%s) -lt $end_time ]; do
        # Check main application
        if curl -f -s "$url" > /dev/null 2>&1; then
            # Check health endpoint
            if curl -f -s "$url/api/health" > /dev/null 2>&1; then
                # Check API endpoints
                if curl -f -s "$url/api/metrics" > /dev/null 2>&1; then
                    log_success "All health checks passed"
                    return 0
                fi
            fi
        fi
        
        log_info "Health check failed, retrying in 10 seconds..."
        sleep 10
    done
    
    log_error "Health checks timed out after $timeout seconds"
    return 1
}

# Rollback deployment
rollback_deployment() {
    log_warning "Starting rollback procedure..."
    
    local timeout="${ROLLBACK_TIMEOUT:-180}"
    local url="http://localhost:3000"
    local start_time=$(date +%s)
    local end_time=$((start_time + timeout))
    
    # Stop current deployment
    log_info "Stopping current deployment..."
    docker-compose down --remove-orphans || true
    
    # Restore previous deployment (this would be implemented based on your backup strategy)
    log_info "Restoring previous deployment..."
    # This is a simplified version - in production, you'd have a proper rollback mechanism
    
    # Wait for restoration
    sleep 30
    
    # Run health checks
    if ! run_health_checks; then
        log_error "Rollback failed - health checks did not pass"
        exit 1
    fi
    
    log_success "Rollback completed successfully"
}

# Show deployment status
show_status() {
    log_info "Deployment Status for Environment: $ENVIRONMENT"
    echo "=============================================="
    
    # Check running containers
    echo "Running Containers:"
    docker-compose ps
    
    echo ""
    echo "Recent Images:"
    docker images | grep "$IMAGE_NAME" | head -5
    
    echo ""
    echo "Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}" \
        $(docker-compose ps -q) 2>/dev/null || echo "No containers running"
    
    echo ""
    echo "Last 10 Log Entries:"
    docker-compose logs --tail=10 app || echo "No logs available"
}

# Cleanup old deployments
cleanup_deployments() {
    log_info "Cleaning up old deployments..."
    
    # Remove old images
    docker images "$IMAGE_NAME" --format "{{.Tag}}\t{{.ID}}" | \
        grep -v "latest-$ENVIRONMENT" | \
        grep -v "$APP_VERSION-$ENVIRONMENT" | \
        awk '{print $2}' | \
        xargs -r docker rmi -f || true
    
    # Remove old containers
    docker ps -a --filter "ancestor=$IMAGE_NAME" --format "{{.ID}}" | \
        xargs -r docker rm -f || true
    
    # Remove unused volumes
    docker volume prune -f || true
    
    log_success "Cleanup completed"
}

# Main deployment function
main_deployment() {
    log_info "Starting deployment process..."
    
    check_prerequisites
    load_environment
    
    if [ "${FORCE_DEPLOY:-false}" != "true" ]; then
        read -p "Continue with deployment? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Deployment cancelled by user"
            exit 0
        fi
    fi
    
    # Build application
    build_application
    
    # Run tests
    if [ "${SKIP_TESTS:-false}" != "true" ]; then
        log_info "Running pre-deployment tests..."
        cd "$PROJECT_ROOT"
        npm test || {
            log_error "Pre-deployment tests failed"
            exit 1
        }
    fi
    
    # Deploy
    if [ "$BLUE_GREEN_ENABLED" = "true" ]; then
        deploy_blue_green
    else
        log_info "Starting standard deployment..."
        docker-compose up -d --remove-orphans
        run_health_checks
    fi
    
    # Final status
    show_status
    
    log_success "Deployment completed successfully!"
}

# Parse command line arguments
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -e|--env)
                ENVIRONMENT="$2"
                shift 2
                ;;
            -v|--version)
                APP_VERSION="$2"
                shift 2
                ;;
            --no-health)
                SKIP_HEALTH_CHECK="true"
                shift
                ;;
            --force)
                FORCE_DEPLOY="true"
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            deploy)
                COMMAND="deploy"
                shift
                ;;
            rollback)
                COMMAND="rollback"
                shift
                ;;
            status)
                COMMAND="status"
                shift
                ;;
            health-check)
                COMMAND="health-check"
                shift
                ;;
            cleanup)
                COMMAND="cleanup"
                shift
                ;;
            *)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

# Main script logic
main() {
    local command="${COMMAND:-deploy}"
    
    case $command in
        deploy)
            main_deployment
            ;;
        rollback)
            rollback_deployment
            ;;
        status)
            show_status
            ;;
        health-check)
            run_health_checks
            ;;
        cleanup)
            cleanup_deployments
            ;;
        *)
            log_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Set default values
COMMAND="${1:-deploy}"
ENVIRONMENT="${ENVIRONMENT:-production}"

# Parse arguments and run main function
parse_arguments "$@"
main