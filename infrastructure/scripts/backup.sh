#!/bin/bash
# DARWIN-MFC BACKUP SCRIPT
# ========================
#
# Automated backup script using Restic.
# Run this via cron or as a scheduled task.

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_TAG="daily"

echo "[$(date)] Starting backup..."

# Check if repository is initialized
restic snapshots > /dev/null 2>&1 || {
    echo "[$(date)] Initializing restic repository..."
    restic init
}

# Backup PostgreSQL data
echo "[$(date)] Backing up PostgreSQL data..."
restic backup /data/postgres \
    --tag postgres \
    --tag $BACKUP_TAG \
    --verbose

# Backup PocketBase data
echo "[$(date)] Backing up PocketBase data..."
restic backup /data/pocketbase \
    --tag pocketbase \
    --tag $BACKUP_TAG \
    --verbose

# Backup Keycloak data
echo "[$(date)] Backing up Keycloak data..."
restic backup /data/keycloak \
    --tag keycloak \
    --tag $BACKUP_TAG \
    --verbose

# Cleanup old backups (keep last 7 daily, 4 weekly, 6 monthly)
echo "[$(date)] Cleaning up old backups..."
restic forget \
    --keep-daily 7 \
    --keep-weekly 4 \
    --keep-monthly 6 \
    --prune

# Verify backup integrity
echo "[$(date)] Verifying backup integrity..."
restic check

echo "[$(date)] Backup completed successfully!"
