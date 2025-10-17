# Shopping API (Node + TypeScript + Postgres)


Quick start:
1. Copy `.env.example` to `.env` and adjust.
2. Start Postgres via docker-compose: `docker-compose up -d`.
3. Install deps: `yarn`.
4. Run migrations: `yarn migrate:up` (this runs psql against DATABASE_URL).
5. Start dev server: `yarn dev` or `yarn watch` then `node dist/server.js`.
6. Run tests: `yarn test`.


Ports:
- Backend: 3000
- Postgres: 5432