#!/bin/bash
# Darwin-MFC Health Check Script
# Comprehensive health monitoring for deployment verification

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TIMEOUT="${HEALTH_CHECK_TIMEOUT:-300}"
ENVIRONMENT="${ENVIRONMENT:-staging}"
HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-http://localhost:3000/api/health}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"; }

# Help function
show_help() {
    cat << EOF
Darwin-MFC Health Check Script

Usage: $0 [OPTIONS]

Options:
    --env           Environment (development|staging|production)
    --endpoint      Health check endpoint URL
    --timeout       Timeout in seconds (default: 300)
    --detailed      Show detailed health information
    --continuous    Run continuous monitoring
    --help          Show this help message

Examples:
    $0 --env production --timeout 300
    $0 --endpoint http://localhost:3000/api/health --detailed
    $0 --continuous --env staging

Environment Variables:
    HEALTH_CHECK_TIMEOUT    Default timeout
    ENVIRONMENT            Target environment
    HEALTH_ENDPOINT        Health check endpoint
EOF
}

# Load environment variables
load_environment() {
    local env_file="$PROJECT_ROOT/.env.$ENVIRONMENT"
    
    if [ -f "$env_file" ]; then
        eval "$(cat "$env_file" | sed 's/\${[^}]*}/$/g' | grep -v '^#' | grep -v '^$')"
    fi
    
    # Set default health endpoint if not provided
    if [ -z "${HEALTH_ENDPOINT:-}" ]; then
        HEALTH_ENDPOINT="http://localhost:3000/api/health"
    fi
}

# Check HTTP connectivity
check_http_connectivity() {
    local url="$1"
    local start_time=$(date +%s)
    
    log_info "Checking HTTP connectivity to: $url"
    
    if curl -f -s --max-time 30 "$url" > /dev/null 2>&1; then
        local response_time=$(( $(date +%s) - start_time ))
        log_success "HTTP connectivity OK (${response_time}s response time)"
        return 0
    else
        log_error "HTTP connectivity failed"
        return 1
    fi
}

# Detailed health check
detailed_health_check() {
    local url="$1"
    local start_time=$(date +%s)
    
    log_info "Running detailed health check..."
    
    # Get health response
    local response
    if ! response=$(curl -f -s --max-time 30 "$url" 2>/dev/null); then
        log_error "Failed to get health check response"
        return 1
    fi
    
    local response_time=$(( $(date +%s) - start_time ))
    
    # Parse and display health information
    echo ""
    echo "=== HEALTH CHECK DETAILS ==="
    echo "Timestamp: $(echo "$response" | jq -r '.timestamp // "N/A"')"
    echo "Status: $(echo "$response" | jq -r '.status // "N/A"')"
    echo "Version: $(echo "$response" | jq -r '.version // "N/A"')"
    echo "Environment: $(echo "$response" | jq -r '.environment // "N/A"')"
    echo "Uptime: $(echo "$response" | jq -r '.uptime // "N/A"')"
    echo "Response Time: ${response_time}s"
    echo ""
    
    # Display individual checks
    if echo "$response" | jq -e '.checks' > /dev/null 2>&1; then
        echo "=== INDIVIDUAL CHECKS ==="
        echo "$response" | jq -r '.checks | to_entries[] | "\(.key): \(.value.status // "N/A")"' | while read -r line; do
            local status=$(echo "$line" | cut -d':' -f2 | tr -d ' ')
            if [ "$status" = "healthy" ]; then
                echo -e "${GREEN}✓${NC} $line"
            elif [ "$status" = "warning" ]; then
                echo -e "${YELLOW}⚠${NC} $line"
            else
                echo -e "${RED}✗${NC} $line"
            fi
        done
        echo ""
    fi
    
    # Display memory usage
    if echo "$response" | jq -e '.memory' > /dev/null 2>&1; then
        echo "=== MEMORY USAGE ==="
        echo "$response" | jq -r '.memory | "Heap Used: \(.heapUsed // "N/A")\nHeap Total: \(.heapTotal // "N/A")\nExternal: \(.external // "N/A")"'
        echo ""
    fi
    
    log_success "Detailed health check completed"
}

# Basic health check
basic_health_check() {
    local url="$1"
    
    log_info "Running basic health check..."
    
    # Check HTTP connectivity
    if ! check_http_connectivity "$url"; then
        return 1
    fi
    
    # Check health endpoint
    local response
    if ! response=$(curl -f -s --max-time 30 "$url" 2>/dev/null); then
        log_error "Health endpoint check failed"
        return 1
    fi
    
    # Parse health status
    local status
    status=$(echo "$response" | jq -r '.status // "unknown"' 2>/dev/null || echo "unknown")
    
    case "$status" in
        "healthy")
            log_success "Application is healthy"
            return 0
            ;;
        "degraded")
            log_warning "Application is degraded but functional"
            return 0
            ;;
        "unhealthy")
            log_error "Application is unhealthy"
            return 1
            ;;
        *)
            log_warning "Unknown health status: $status"
            return 1
            ;;
    esac
}

# Check external services
check_external_services() {
    log_info "Checking external services..."
    
    # Check Supabase connectivity
    if [ -n "${NEXT_PUBLIC_SUPABASE_URL:-}" ]; then
        log_info "Checking Supabase connectivity..."
        if curl -f -s --max-time 30 "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/" > /dev/null 2>&1; then
            log_success "Supabase connectivity OK"
        else
            log_warning "Supabase connectivity check failed"
        fi
    fi
    
    # Check Redis connectivity
    if [ -n "${REDIS_URL:-}" ] || command -v redis-cli &> /dev/null; then
        log_info "Checking Redis connectivity..."
        if redis-cli ping > /dev/null 2>&1; then
            log_success "Redis connectivity OK"
        else
            log_warning "Redis connectivity check failed"
        fi
    fi
    
    # Check database connectivity
    if command -v pg_isready &> /dev/null && [ -n "${POSTGRES_HOST:-}" ]; then
        log_info "Checking PostgreSQL connectivity..."
        if pg_isready -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT:-5432}" -U "${POSTGRES_USER}" > /dev/null 2>&1; then
            log_success "PostgreSQL connectivity OK"
        else
            log_warning "PostgreSQL connectivity check failed"
        fi
    fi
}

# Check Docker containers
check_docker_containers() {
    if command -v docker &> /dev/null; then
        log_info "Checking Docker containers..."
        
        # Check if containers are running
        local running_containers
        running_containers=$(docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null | grep -v "NAMES")
        
        if [ -n "$running_containers" ]; then
            echo "=== DOCKER CONTAINERS ==="
            echo "$running_containers"
            echo ""
            log_success "Docker containers status retrieved"
        else
            log_warning "No running Docker containers found"
        fi
    fi
}

# Performance monitoring
performance_monitoring() {
    log_info "Running performance monitoring..."
    
    # Monitor response time for 60 seconds
    local samples=10
    local total_time=0
    local failed_requests=0
    
    for i in $(seq 1 $samples); do
        local start_time=$(date +%s.%3N)
        
        if curl -f -s --max-time 10 "$HEALTH_ENDPOINT" > /dev/null 2>&1; then
            local end_time=$(date +%s.%3N)
            local request_time=$(echo "$end_time - $start_time" | bc)
            total_time=$(echo "$total_time + $request_time" | bc)
            log_info "Request $i: ${request_time}s"
        else
            failed_requests=$((failed_requests + 1))
            log_warning "Request $i: FAILED"
        fi
        
        sleep 6
    done
    
    if [ $failed_requests -eq 0 ]; then
        local avg_time=$(echo "scale=3; $total_time / $samples" | bc)
        log_success "Performance monitoring completed - Average response time: ${avg_time}s"
    else
        log_warning "Performance monitoring completed - $failed_requests failed requests out of $samples"
    fi
}

# Continuous monitoring
continuous_monitoring() {
    log_info "Starting continuous monitoring..."
    log_info "Press Ctrl+C to stop"
    
    local counter=1
    
    while true; do
        echo ""
        echo "=== HEALTH CHECK $counter ==="
        
        if basic_health_check "$HEALTH_ENDPOINT"; then
            echo -e "${GREEN}✓${NC} Check $counter: HEALTHY"
        else
            echo -e "${RED}✗${NC} Check $counter: UNHEALTHY"
        fi
        
        counter=$((counter + 1))
        sleep 30
    done
}

# Main health check function
run_health_check() {
    local start_time=$(date +%s)
    
    log_info "Starting health check for environment: $ENVIRONMENT"
    log_info "Target endpoint: $HEALTH_ENDPOINT"
    log_info "Timeout: ${TIMEOUT}s"
    
    load_environment
    
    # Set overall timeout
    (
        sleep "$TIMEOUT"
        log_error "Health check timed out after ${TIMEOUT}s"
        exit 1
    ) &
    local timeout_pid=$!
    
    local health_check_passed=false
    
    # Run health check
    if basic_health_check "$HEALTH_ENDPOINT"; then
        health_check_passed=true
    fi
    
    # Run additional checks if basic check passed
    if [ "$health_check_passed" = true ]; then
        check_external_services
        check_docker_containers
        performance_monitoring
        
        # Run detailed check if requested
        if [ "${DETAILED:-false}" = "true" ]; then
            detailed_health_check "$HEALTH_ENDPOINT"
        fi
    fi
    
    # Kill timeout process
    kill $timeout_pid 2>/dev/null || true
    
    local end_time=$(date +%s)
    local total_time=$((end_time - start_time))
    
    echo ""
    if [ "$health_check_passed" = true ]; then
        log_success "Health check completed successfully (${total_time}s)"
        return 0
    else
        log_error "Health check failed (${total_time}s)"
        return 1
    fi
}

# Parse arguments
DETAILED=false
CONTINUOUS=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --endpoint)
            HEALTH_ENDPOINT="$2"
            shift 2
            ;;
        --timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        --detailed)
            DETAILED=true
            shift
            ;;
        --continuous)
            CONTINUOUS=true
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Main execution
if [ "$CONTINUOUS" = true ]; then
    continuous_monitoring
else
    run_health_check
fi