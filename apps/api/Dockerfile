FROM node:20-alpine AS builder

WORKDIR /app

# Instalar turbo globalmente
RUN npm install -g turbo

# Copiar arquivos de configuração do monorepo
COPY package*.json turbo.json ./
COPY apps/api/package*.json ./apps/api/
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

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "apps/api/dist/index.js"]
