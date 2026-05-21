FROM node:20-alpine AS builder

WORKDIR /app

# Instalar turbo globalmente
RUN npm install -g turbo

# Copiar arquivos de configuração do monorepo e todos os package.json para melhor aproveitamento de cache do npm
COPY package*.json turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/
COPY packages/database/package*.json ./packages/database/
COPY packages/shared/package*.json ./packages/shared/

# Instalar dependências de todo o monorepo
RUN npm install

# Copiar o resto do código
COPY . .

# Gerar o cliente do Prisma
RUN npx turbo run generate

# Build da API
RUN npx turbo run build --filter=api

# --- Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules

# Copiar o schema do Prisma e migrations para possibilitar migração automática no startup
COPY --from=builder /app/packages/database/schema.prisma ./packages/database/
COPY --from=builder /app/packages/database/migrations ./packages/database/migrations

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Executa migrações pendentes no Postgres antes de iniciar o servidor da API
CMD ["sh", "-c", "npx prisma migrate deploy --schema=packages/database/schema.prisma && node apps/api/dist/index.js"]
