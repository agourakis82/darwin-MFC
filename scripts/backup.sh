#!/bin/bash
# Darwin-MFC Backup and Disaster Recovery Script
# Automated backup system with encryption and monitoring

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_ROOT/backups}"
ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY}"
S3_BUCKET="${S3_BACKUP_BUCKET:-darwin-mfc-backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"

# Environment
ENVIRONMENT="${ENVIRONMENT:-production}"
APP_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

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

# Create backup directories
setup_backup_directories() {
    log_info "Setting up backup directories..."
    
    local dirs=("$BACKUP_DIR" "$BACKUP_DIR/encrypted" "$BACKUP_DIR/verified" "$BACKUP_DIR/logs")
    for dir in "${dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            chmod 700 "$dir"
            log_info "Created directory: $dir"
        fi
    done
}

# Database backup function
backup_database() {
    log_info "Starting database backup..."
    
    local db_backup_file="$BACKUP_DIR/database_${ENVIRONMENT}_${TIMESTAMP}.sql"
    
    case "${DATABASE_TYPE:-postgresql}" in
        "postgresql")
            backup_postgresql "$db_backup_file"
            ;;
        "supabase")
            backup_supabase "$db_backup_file"
            ;;
        *)
            log_error "Unsupported database type: ${DATABASE_TYPE:-postgresql}"
            return 1
            ;;
    esac
    
    log_success "Database backup completed: $db_backup_file"
}

# PostgreSQL backup
backup_postgresql() {
    local output_file="$1"
    
    if [ -n "${POSTGRES_URL:-}" ]; then
        PGPASSWORD="$POSTGRES_PASSWORD" pg_dump "$POSTGRES_URL" > "$output_file"
    elif [ -n "${POSTGRES_HOST:-}" ]; then
        PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
            -h "$POSTGRES_HOST" \
            -p "${POSTGRES_PORT:-5432}" \
            -U "$POSTGRES_USER" \
            -d "$POSTGRES_DB" > "$output_file"
    else
        log_error "PostgreSQL connection parameters not found"
        return 1
    fi
}

# Supabase backup
backup_supabase() {
    local output_file="$1"
    local backup_name="darwin-mfc-backup-${TIMESTAMP}"
    
    # Create Supabase backup via API
    if [ -n "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
        curl -X POST \
            -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
            -H "Content-Type: application/json" \
            -d "{\"name\": \"$backup_name\"}" \
            "https://$(echo "$NEXT_PUBLIC_SUPABASE_URL" | cut -d'/' -f3)/rest/v1/backup"
        
        # Download backup (simplified - actual implementation would handle async backup creation)
        log_info "Supabase backup initiated: $backup_name"
    else
        log_error "Supabase service role key not found"
        return 1
    fi
}

# Application files backup
backup_application_files() {
    log_info "Starting application files backup..."
    
    local app_backup_file="$BACKUP_DIR/app_files_${ENVIRONMENT}_${TIMESTAMP}.tar.gz"
    
    # Backup critical application files
    local backup_items=(
        ".env.$ENVIRONMENT"
        "package.json"
        "package-lock.json"
        "next.config.ts"
        "public/"
        "app/"
        "lib/"
        "components/"
        "scripts/"
        "docs/"
    )
    
    tar -czf "$app_backup_file" "${backup_items[@]}" || {
        log_error "Failed to backup application files"
        return 1
    }
    
    log_success "Application files backup completed: $app_backup_file"
}

# Docker volumes backup
backup_docker_volumes() {
    log_info "Starting Docker volumes backup..."
    
    # List of volumes to backup
    local volumes=("postgres_data" "redis_data" "app_data" "supabase_data")
    
    for volume in "${volumes[@]}"; do
        if docker volume ls -q | grep -q "$volume"; then
            local volume_backup_file="$BACKUP_DIR/volume_${volume}_${TIMESTAMP}.tar.gz"
            
            docker run --rm \
                -v "${volume}:/source" \
                -v "$BACKUP_DIR:/backup" \
                alpine tar -czf "/backup/volume_${volume}_${TIMESTAMP}.tar.gz" -C /source .
            
            log_success "Volume backup completed: $volume_backup_file"
        else
            log_warning "Volume not found: $volume"
        fi
    done
}

# Configuration backup
backup_configuration() {
    log_info "Starting configuration backup..."
    
    local config_backup_file="$BACKUP_DIR/config_${ENVIRONMENT}_${TIMESTAMP}.tar.gz"
    
    # Backup configuration files
    local config_items=(
        "docker-compose.yml"
        "Dockerfile"
        ".dockerignore"
        "nginx/"
        "monitoring/"
        "scripts/"
    )
    
    tar -czf "$config_backup_file" "${config_items[@]}" || {
        log_error "Failed to backup configuration files"
        return 1
    }
    
    log_success "Configuration backup completed: $config_backup_file"
}

# Encrypt backup files
encrypt_backups() {
    log_info "Encrypting backup files..."
    
    local encrypted_dir="$BACKUP_DIR/encrypted"
    
    # Find all unencrypted backup files
    find "$BACKUP_DIR" -name "*.sql" -o -name "*.tar.gz" | while read -r file; do
        local encrypted_file="$encrypted_dir/$(basename "$file").enc"
        
        if [ -n "$ENCRYPTION_KEY" ]; then
            openssl enc -aes-256-cbc -salt -in "$file" -out "$encrypted_file" -k "$ENCRYPTION_KEY"
            chmod 600 "$encrypted_file"
            
            # Remove original file
            rm -f "$file"
            
            log_info "Encrypted: $file -> $encrypted_file"
        else
            log_warning "No encryption key provided, skipping encryption for $file"
        fi
    done
    
    log_success "Backup encryption completed"
}

# Upload to cloud storage
upload_to_cloud() {
    log_info "Uploading backups to cloud storage..."
    
    local s3_bucket="${S3_BUCKET}"
    local s3_prefix="${ENVIRONMENT}/${APP_VERSION}"
    
    # Upload encrypted files to S3
    find "$BACKUP_DIR/encrypted" -name "*.enc" | while read -r file; do
        local s3_key="$s3_prefix/$(basename "$file")"
        
        if command -v aws &> /dev/null; then
            aws s3 cp "$file" "s3://$s3_bucket/$s3_key" || {
                log_error "Failed to upload $file to S3"
                return 1
            }
            log_success "Uploaded to S3: s3://$s3_bucket/$s3_key"
        else
            log_warning "AWS CLI not found, skipping cloud upload"
            return 1
        fi
    done
}

# Verify backup integrity
verify_backup() {
    log_info "Verifying backup integrity..."
    
    local verified_dir="$BACKUP_DIR/verified"
    local failed_verifications=0
    
    # Test encryption/decryption
    find "$BACKUP_DIR/encrypted" -name "*.enc" | while read -r encrypted_file; do
        local test_file="$verified_dir/test_decrypt_$(date +%s)"
        
        if openssl enc -aes-256-cbc -d -in "$encrypted_file" -out "$test_file" -k "$ENCRYPTION_KEY" 2>/dev/null; then
            rm -f "$test_file"
            log_success "Encryption verified: $(basename "$encrypted_file")"
        else
            log_error "Encryption verification failed: $encrypted_file"
            failed_verifications=$((failed_verifications + 1))
        fi
    done
    
    # Test file integrity
    find "$BACKUP_DIR" -name "*.sql" -o -name "*.tar.gz" | while read -r file; do
        case "$file" in
            *.tar.gz)
                tar -tzf "$file" > /dev/null || {
                    log_error "Tar archive corrupted: $file"
                    failed_verifications=$((failed_verifications + 1))
                }
                ;;
            *.sql)
                # Basic SQL file validation
                head -5 "$file" | grep -q "^--" || {
                    log_error "SQL file appears corrupted: $file"
                    failed_verifications=$((failed_verifications + 1))
                }
                ;;
        esac
    done
    
    if [ $failed_verifications -eq 0 ]; then
        log_success "All backup integrity checks passed"
        return 0
    else
        log_error "Backup verification failed: $failed_verifications errors found"
        return 1
    fi
}

# Cleanup old backups
cleanup_old_backups() {
    log_info "Cleaning up old backups (retention: $RETENTION_DAYS days)..."
    
    # Remove old local backups
    find "$BACKUP_DIR" -type f -mtime +$RETENTION_DAYS -delete || true
    
    # Remove old S3 backups
    if command -v aws &> /dev/null && [ -n "$S3_BUCKET" ]; then
        local cutoff_date=$(date -d "$RETENTION_DAYS days ago" +%Y-%m-%d)
        aws s3api list-objects-v2 \
            --bucket "$S3_BUCKET" \
            --prefix "${ENVIRONMENT}/" \
            --query "Contents[?LastModified<='$cutoff_date'].Key" \
            --output text | while read -r key; do
            [ -n "$key" ] && aws s3 rm "s3://$S3_BUCKET/$key"
        done
    fi
    
    log_success "Cleanup completed"
}

# Send notifications
send_notification() {
    local status="$1"
    local message="$2"
    
    # Slack notification (if configured)
    if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"Darwin-MFC Backup $status: $message\"}" \
            "$SLACK_WEBHOOK_URL" || true
    fi
    
    # Email notification (if configured)
    if [ -n "${EMAIL_NOTIFICATION_URL:-}" ]; then
        curl -X POST \
            -H "Content-Type: application/json" \
            -d "{\"subject\":\"Darwin-MFC Backup $status\",\"message\":\"$message\"}" \
            "$EMAIL_NOTIFICATION_URL" || true
    fi
}

# Run full backup process
run_full_backup() {
    log_info "Starting full backup process for environment: $ENVIRONMENT"
    
    local backup_log="$BACKUP_DIR/logs/backup_${TIMESTAMP}.log"
    exec > >(tee -a "$backup_log") 2>&1
    
    setup_backup_directories
    
    # Create backup manifest
    local manifest_file="$BACKUP_DIR/manifest_${TIMESTAMP}.json"
    cat > "$manifest_file" << EOF
{
    "timestamp": "$TIMESTAMP",
    "environment": "$ENVIRONMENT",
    "app_version": "$APP_VERSION",
    "backup_files": [],
    "checksum": "",
    "status": "in_progress"
}
EOF
    
    # Run backups
    backup_database
    backup_application_files
    backup_docker_volumes
    backup_configuration
    
    # Encrypt backups
    encrypt_backups
    
    # Upload to cloud
    upload_to_cloud
    
    # Verify backup
    if verify_backup; then
        # Update manifest
        cat > "$manifest_file" << EOF
{
    "timestamp": "$TIMESTAMP",
    "environment": "$ENVIRONMENT",
    "app_version": "$APP_VERSION",
    "backup_files": [
$(find "$BACKUP_DIR" -name "*.enc" -exec basename {} \; | sed 's/^/        "/; s/$/"/' | paste -sd, -)
    ],
    "checksum": "$(find "$BACKUP_DIR/encrypted" -type f -exec sha256sum {} \; | sha256sum | cut -d' ' -f1)",
    "status": "completed"
}
EOF
        
        send_notification "SUCCESS" "Backup completed successfully for $ENVIRONMENT"
        log_success "Backup process completed successfully"
    else
        # Update manifest
        cat > "$manifest_file" << EOF
{
    "timestamp": "$TIMESTAMP",
    "environment": "$ENVIRONMENT",
    "app_version": "$APP_VERSION",
    "backup_files": [],
    "checksum": "",
    "status": "failed"
}
EOF
        
        send_notification "FAILED" "Backup failed for $ENVIRONMENT"
        log_error "Backup process failed"
        return 1
    fi
    
    # Cleanup old backups
    cleanup_old_backups
}

# Disaster recovery simulation
simulate_disaster_recovery() {
    log_info "Starting disaster recovery simulation..."
    
    local backup_file="$1"
    local recovery_dir="$BACKUP_DIR/recovery_${TIMESTAMP}"
    mkdir -p "$recovery_dir"
    
    # Decrypt and extract backup
    if [ -n "$ENCRYPTION_KEY" ]; then
        local decrypted_file="$recovery_dir/$(basename "$backup_file" .enc)"
        openssl enc -aes-256-cbc -d -in "$backup_file" -out "$decrypted_file" -k "$ENCRYPTION_KEY"
        
        case "$decrypted_file" in
            *.tar.gz)
                tar -xzf "$decrypted_file" -C "$recovery_dir"
                ;;
            *.sql)
                log_info "Database backup file ready for restoration: $decrypted_file"
                ;;
        esac
    else
        log_error "No encryption key provided for disaster recovery"
        return 1
    fi
    
    log_success "Disaster recovery simulation completed"
    log_info "Recovery files available in: $recovery_dir"
}

# Help function
show_help() {
    cat << EOF
Darwin-MFC Backup and Disaster Recovery Script

Usage: $0 [COMMAND] [OPTIONS]

Commands:
    backup         Run full backup process
    verify         Verify backup integrity
    cleanup        Clean up old backups
    simulate-dr    Simulate disaster recovery
    help           Show this help message

Environment Variables:
    ENVIRONMENT              Target environment
    BACKUP_DIR              Backup directory path
    ENCRYPTION_KEY          Encryption key for backups
    S3_BACKUP_BUCKET       S3 bucket for cloud backups
    RETENTION_DAYS          Backup retention period
    DATABASE_TYPE           Database type (postgresql|supabase)

Examples:
    $0 backup --env production
    $0 verify --env staging
    $0 simulate-dr --env development

Required Environment Variables:
    For PostgreSQL:
    - POSTGRES_URL or POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
    
    For Supabase:
    - SUPABASE_SERVICE_ROLE_KEY
    - NEXT_PUBLIC_SUPABASE_URL
    
    For encryption:
    - ENCRYPTION_KEY
    
    For cloud backup:
    - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
    - S3_BACKUP_BUCKET
EOF
}

# Parse arguments
COMMAND="${1:-backup}"
ENVIRONMENT="${ENVIRONMENT:-production}"

case $COMMAND in
    backup)
        run_full_backup
        ;;
    verify)
        verify_backup
        ;;
    cleanup)
        cleanup_old_backups
        ;;
    simulate-dr)
        shift
        if [ -z "${1:-}" ]; then
            log_error "Backup file path required for disaster recovery simulation"
            exit 1
        fi
        simulate_disaster_recovery "$1"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        log_error "Unknown command: $COMMAND"
        show_help
        exit 1
        ;;
esac