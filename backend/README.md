# Parent Backend (Node.js)

TypeScript/Express API server for the Parent mobile application backend.

## Setup

```bash
cd backend
npm install
cp .env.example .env # adjust values
```

## Available Scripts

- `npm run dev` – run the API with hot-reload (ts-node-dev)
- `npm run build` – compile TypeScript to `dist/`
- `npm start` – run the compiled JavaScript output
- `npm run lint` – ESLint with TypeScript rules
- `npm test` – Vitest + Supertest suite

## Project Structure

- `src/app.ts` – Express app definition and middleware
- `src/env.ts` – environment variable loading/validation
- `src/index.ts` – server bootstrap
- `test/` – example integration tests
- `.eslintrc.cjs`, `.prettierrc.json`, `tsconfig.json` – tooling configuration

## Health Check

A starter route is available at `GET /health` returning `{ "status": "ok" }`. Extend `src/app.ts` with additional routers and controllers as you build features.
