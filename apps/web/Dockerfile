FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g turbo

# Copiar arquivos de configuração do monorepo e todos os package.json para melhor aproveitamento de cache do npm
COPY package*.json turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/
COPY packages/database/package*.json ./packages/database/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

# Build do Next.js
RUN npx turbo run build --filter=web

# --- Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar arquivos de workspace raiz para permitir execução com scripts de workspace
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/turbo.json ./

# Copiar arquivos específicos do frontend
COPY --from=builder /app/apps/web/next.config.ts ./apps/web/
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Inicializa usando a definição de workspace do monorepo npm
CMD ["npm", "run", "start", "--workspace=web"]
