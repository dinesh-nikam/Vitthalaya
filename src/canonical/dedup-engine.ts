/**
 * Digital Pandharpur — Canonical Dedup Engine
 *
 * In-memory exact-hash and fuzzy deduplication engine for Marathi devotional compositions.
 * Used during batch scraping, automated ingestion, and canonical consolidation.
 */

import { contentHash, normalizeForComparison } from './normalization';
import { CanonicalEngine } from './canonical-engine';
import { CONFIDENCE_THRESHOLDS, type MatchResult } from './types';
import type { CompositionSummary, CanonicalRecordData } from '../db/canonical';

export interface DedupCompositionInput {
  title_marathi?: string;
  title_transliteration?: string;
  type?: string;
  full_text: string;
  source_attribution?: string;
  source_url?: string;
  saint_id?: string | null;
}

export interface CanonicalRecordInput {
  id: string;
  titleMarathi: string;
  canonicalText: string;
  type: string;
  saintId?: string | null;
  version?: number;
}

export interface DedupCheckResult {
  isDuplicate: boolean;
  layer: 'exact_hash' | 'fuzzy' | 'none';
  confidence: number;
  canonicalRecordId?: string | null;
  matchResult?: MatchResult | null;
}

export class DedupEngine {
  private exactHashes = new Set<string>();
  private canonicalRecords: CanonicalRecordData[] = [];
  private canonicalEngine = new CanonicalEngine();

  get size(): number {
    return this.exactHashes.size;
  }

  /** Add an entry to the exact hash lookup set */
  add(comp: DedupCompositionInput): void {
    const hash = contentHash(comp.full_text);
    this.exactHashes.add(hash);
  }

  /** Pre-populate known hashes */
  load(hashes: string[]): void {
    for (const h of hashes) {
      if (h) this.exactHashes.add(h);
    }
  }

  /** Load existing canonical records for fuzzy comparison */
  loadCanonicalRecords(records: CanonicalRecordInput[]): void {
    this.canonicalRecords = records.map((r) => ({
      id: r.id,
      title: r.titleMarathi,
      canonicalText: r.canonicalText,
      type: (r.type || 'ABHANG').toUpperCase(),
      saintId: r.saintId ?? null,
      version: r.version ?? 1,
    }));
  }

  /**
   * Determine whether a composition is a duplicate.
   * Priority:
   * 1. Exact normalized content hash (O(1))
   * 2. Fuzzy algorithmic similarity against canonical records (O(N))
   */
  isDuplicate(comp: DedupCompositionInput): DedupCheckResult {
    const hash = contentHash(comp.full_text);
    if (this.exactHashes.has(hash)) {
      return {
        isDuplicate: true,
        layer: 'exact_hash',
        confidence: 1.0,
        canonicalRecordId: null,
        matchResult: null,
      };
    }

    if (this.canonicalRecords.length > 0) {
      const summary: CompositionSummary = {
        id: 'query',
        title: comp.title_marathi || '',
        fullText: comp.full_text,
        type: (comp.type || 'ABHANG').toUpperCase(),
        saintId: comp.saint_id ?? null,
      };

      const match = this.canonicalEngine.findBestMatch(summary, this.canonicalRecords);
      if (match && match.confidence >= CONFIDENCE_THRESHOLDS.AUTO_MERGE) {
        return {
          isDuplicate: true,
          layer: 'fuzzy',
          confidence: match.confidence,
          canonicalRecordId: match.canonicalRecordId,
          matchResult: match,
        };
      }
    }

    return {
      isDuplicate: false,
      layer: 'none',
      confidence: 0,
      canonicalRecordId: null,
      matchResult: null,
    };
  }
}

/** Normalize a title for indexing or display comparison */
export function normalizeTitle(title: string): string {
  return normalizeForComparison(title).replace(/\s+/g, ' ').trim();
}
