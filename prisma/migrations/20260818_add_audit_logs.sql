-- Migration: Add audit_logs table (Immutable administrative and editorial audit trail)
CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_id" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "before" TEXT,
    "after" TEXT,
    "metadata" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");
CREATE INDEX IF NOT EXISTS "audit_logs_created_at_idx" ON "audit_logs"("created_at");
CREATE INDEX IF NOT EXISTS "audit_logs_actor_id_idx" ON "audit_logs"("actor_id");
