# Dockerfile - Sistema de Educação Médica SOTA 2025-2026
FROM node:18-alpine AS builder

# Instalar dependências globais
RUN apk add --no-cache python3 make g++

# Definir working directory
WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Instalar dependências do backend
WORKDIR /app/backend
RUN npm ci --only=production

# Copiar código fonte
WORKDIR /app
COPY . .

# Build do backend
WORKDIR /app/backend
RUN npm run build

# Build do frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# Stage de produção
FROM node:18-alpine AS production

# Instalar dumb-init para melhor handling de sinais
RUN apk add --no-cache dumb-init

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Definir working directory
WORKDIR /app

# Copiar apenas arquivos necessários para produção
COPY --from=builder --chown=nodejs:nodejs /app/backend/dist ./backend/dist
COPY --from=builder --chown=nodejs:nodejs /app/backend/node_modules ./backend/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/backend/package*.json ./backend/

# Copiar frontend build
COPY --from=builder --chown=nodejs:nodejs /app/frontend/dist ./frontend/dist

# Criar diretórios de logs e cache
RUN mkdir -p /app/logs /app/cache
RUN chown -R nodejs:nodejs /app/logs /app/cache

# Switch para usuário não-root
USER nodejs

# Expor porta
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Usar dumb-init para handling adequado de sinais
ENTRYPOINT ["dumb-init", "--"]

# Comando padrão
CMD ["node", "backend/dist/index.js"]