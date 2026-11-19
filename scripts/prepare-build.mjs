#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// ── 1. Switch Prisma Provider based on DATABASE_URL ─────────────────────────
const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
const dbUrl = process.env.DATABASE_URL || '';
const isSqlite = dbUrl.startsWith('file:') || dbUrl.startsWith('sqlite:');
const isCockroach = !isSqlite && (dbUrl.includes('cockroach') || dbUrl.includes('26257'));
const targetProvider = isSqlite ? 'sqlite' : (isCockroach ? 'cockroachdb' : 'postgresql');

console.log(`[Build] DATABASE_URL: ${dbUrl ? (isSqlite ? 'SQLite' : (isCockroach ? 'CockroachDB' : 'PostgreSQL')) : 'none (fallback to postgresql)'}`);
console.log(`[Build] Target datasource provider: ${targetProvider}`);

if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const datasourceRegex = /(datasource\s+db\s*\{[^}]*provider\s*=\s*["'])(postgresql|cockroachdb|sqlite)(["'])/;

  if (datasourceRegex.test(schema)) {
    const updatedSchema = schema.replace(datasourceRegex, `$1${targetProvider}$3`);
    if (schema !== updatedSchema) {
      fs.writeFileSync(schemaPath, updatedSchema, 'utf8');
      console.log(`[Build] Updated prisma/schema.prisma provider to: ${targetProvider}`);
    } else {
      console.log(`[Build] Schema provider already matches: ${targetProvider}`);
    }
  }
}

// ── 2. Run Prisma Generate ──────────────────────────────────────────────────
console.log('[Build] Generating Prisma Client...');
const isBun = typeof Bun !== 'undefined' || process.versions.bun != null;
const npxCmd = isBun ? 'bunx prisma' : 'npx --yes prisma';

try {
  execSync(`${npxCmd} generate`, { stdio: 'inherit' });
} catch (err) {
  console.error('[Build] Error during prisma generate:', err.message);
  process.exit(1);
}

// ── 3. Database Sync & Seeding (CI & Local Dev only; skipped on Vercel) ─────
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const hasDbUrl = Boolean(dbUrl);

if (isVercel) {
  console.log('[Build] Vercel build detected: skipping schema push and seed (safe for production serverless deployment).');
} else if (hasDbUrl) {
  try {
    console.log('[Build] Synchronizing database schema via db push...');
    execSync(`${npxCmd} db push --accept-data-loss`, { stdio: 'inherit' });

    console.log('[Build] Applying SQL migrations and database seed...');
    const runner = isBun ? 'bun run' : 'npm run';
    try {
      execSync(`${runner} db:seed`, { stdio: 'inherit' });
    } catch (seedErr) {
      console.warn('[Build] Warning: db:seed encountered an issue:', seedErr.message);
    }
  } catch (err) {
    console.warn('[Build] Warning: Database synchronization skipped or failed:', err.message);
  }
} else {
  console.log('[Build] No DATABASE_URL provided: skipping DB push and seed.');
}
