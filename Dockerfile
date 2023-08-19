FROM node:18.16.1-alpine3.18 as base

FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock /app
RUN yarn --frozen-lockfile

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]
