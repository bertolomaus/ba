# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

Setup sqlite database:
- install Drizzle ORM & Drizzle Kit:
```bash
pnpm add drizzle-orm better-sqlite3
pnpm add -D drizzle-kit
```
- add files: 
    - server/utils/db.ts
    - ~/drizzle.config.ts
    - ~/schema.ts
- dbCredentials to drizzle.config.ts:
```bash
dbCredentials: {
    url: "./sqlite.db"
}
```
- run scripts: 
```bash
pnpm drizzle-generate
pnpm drizzle-migrate
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
