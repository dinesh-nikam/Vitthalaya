# Ashadhi Ekadashi High-Concurrency Operational Runbook
**Platform:** Digital Pandharpur (`digital-pandharpur`)  
**Target Event:** Ashadhi Ekadashi (Ashadh Shukla Ekadashi)  
**Target Date:** July 25, 2026 (Annual Maha-Sohala)  
**Standard:** Enterprise SRE & High-Availability Devotional Operations

---

## 1. Ashadhi Readiness Checklist

| Category | Checklist Item | Verification Criteria | Status |
|---|---|---|:---:|
| **Code Freeze** | Change-Freeze Window | Strict production code-freeze 7 days prior (Ashadh Shukla Chaturthi to Ashadh Shukla Pournima). Emergency hotfixes require Principal Architect + DevOps approval. | MANDATORY |
| **Pre-Scaling** | Database & Compute Scaling | Scale PostgreSQL instance connection pool (PgBouncer pool size: 200, max client connections: 1,000). Autoscale Next.js web instances to minimum 5 replicas. | T-72h |
| **Cache Warm-Up** | Edge & Redis Pre-Warming | Run cache pre-warming script on top 500 abhangs, Haripath routes, and live Palkhi schedule stops to achieve >95% edge cache hit ratio. | T-48h |
| **Degraded Mode** | Static Fallback Deployment | Generate and stage immutable static JSON and HTML bundles of the top 500 abhangs and Wari route schedules to S3/Cloudflare edge. | T-24h |
| **Rate Limiting** | DDoS & Scraping Protection | Throttle unauthenticated traffic: 60 req/min per IP on search, 120 req/min on composition reading. Whitelist critical health and status endpoints. | ACTIVE |
| **Status Page** | Public Telemetry & Status | Public status page configured at `status.digitalpandharpur.org` with automated synthetic probes monitoring `/` and `/api/health`. | ACTIVE |
| **On-Call Roster** | Primary & Secondary Shifts | 24/7 on-call engineering roster assigned in 8-hour rotations across Ashadhi week. Escalation bridge active on PagerDuty/Discord. | T-7d |

---

## 2. Degraded-Mode Architecture & Static Failover

When database load exceeds 85% CPU or connection pool latency crosses 2,000ms:
1. **Edge Interception:** Cloudflare Worker detects origin 5xx or latency spikes and routes traffic directly to pre-generated static snapshots:
   * `/abhang/[slug]` → Serves cached static reader HTML.
   * `/wari` → Serves pre-compiled offline Palkhi schedule JSON.
   * `/api/v1/compositions/[id]` → Serves static JSON bundle with `stale-while-revalidate`.
2. **Read-Only Mode:** Disable non-essential database write operations:
   * Disable community suggestions and OCR uploads during peak 48 hours.
   * Queue bookmarking and reading progress to client `localStorage` for deferred sync.

---

## 3. Incident Response & Rollback Runbook

### 3.1 Immediate Rollback Procedure
If a breaking regression occurs in production:
1. Revert deployment to previous container digest or Vercel instant rollback:
   ```powershell
   # Instant deployment rollback
   vercel rollback
   # Or container redeployment
   docker-compose -f deployment/docker-compose.yml up -d --build
   ```
2. Verify system recovery using synthetic health check:
   ```powershell
   curl -I https://digitalpandharpur.com/api/health
   ```
3. Target Rollback SLA: **< 3 minutes**.

### 3.2 Database Restore Runbook
1. If data corruption or inadvertent mutation occurs:
   ```powershell
   bun run scripts/backup-restore.ts --restore --source=varkari_backup.dump
   ```
2. Re-apply verified schema migrations:
   ```powershell
   bun run db:sqlmigrate
   ```
