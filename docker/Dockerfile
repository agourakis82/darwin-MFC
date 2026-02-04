# Darwin-MFC Static Site Deployment
# ==================================
# Lightweight nginx container serving the static Next.js export
#
# Build context should be the project root:
#   docker build -t darwin-mfc -f docker/Dockerfile .

FROM nginx:alpine

# Install additional dependencies for health checks
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy the static build output (context is project root)
COPY out/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/pt/ || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
