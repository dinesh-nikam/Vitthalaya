import { describe, expect, it, mock } from 'bun:test';
import { db as actualDb } from '@/src/db/client';

// Mock next-auth for requireAdmin unit test
let mockSession: any = null;
mock.module('next-auth', () => ({
  getServerSession: () => Promise.resolve(mockSession),
}));

// In-memory mock for db in moderation tests
const mockUsers = new Map<string, any>();
const mockFiles = new Map<string, any>();
const mockQueues = new Map<string, any>();
const mockReviews = new Map<string, any>();

mock.module('@/src/db/client', () => ({
  db: new Proxy(actualDb, {
    get(target, modelProp) {
      if (modelProp === 'user') {
        return {
          findUnique: async ({ where }: any) => mockUsers.get(where.id) || null,
          create: async ({ data }: any) => {
            mockUsers.set(data.id, data);
            return data;
          },
          delete: async ({ where }: any) => {
            mockUsers.delete(where.id);
            return true;
          },
        };
      }
      if (modelProp === 'uploadedFile') {
        return {
          findUnique: async ({ where }: any) => mockFiles.get(where.id) || null,
          create: async ({ data }: any) => {
            mockFiles.set(data.id, data);
            return data;
          },
          delete: async ({ where }: any) => {
            mockFiles.delete(where.id);
            return true;
          },
        };
      }
      if (modelProp === 'moderationQueue') {
        return {
          findUnique: async ({ where }: any) => {
            const item = mockQueues.get(where.id);
            if (!item) return null;
            return {
              ...item,
              reviews: Array.from(mockReviews.values()).filter((r: any) => r.queueId === where.id),
            };
          },
          create: async ({ data }: any) => {
            mockQueues.set(data.id, data);
            return data;
          },
          delete: async ({ where }: any) => {
            mockQueues.delete(where.id);
            return true;
          },
        };
      }
      if (modelProp === 'moderationReview') {
        return {
          create: async ({ data }: any) => {
            const id = data.id || `review-${Date.now()}`;
            mockReviews.set(id, { id, ...data });
            return data;
          },
        };
      }
      return (target as any)[modelProp];
    },
  }),
}));

import { submitPeerVote } from '@/src/lib/moderation-workflow';
import { requireAdmin } from '@/src/lib/require-admin';
import { db } from '@/src/db/client';

describe('Moderation Self-Voting Prevention & Admin Guards', () => {
  it('TC-MOD-001: prevents an author from reviewing or voting on their own uploaded file', async () => {
    const authorId = `test-author-${Date.now()}`;
    const fileId = `test-file-${Date.now()}`;
    const queueId = `test-queue-${Date.now()}`;

    await db.user.create({
      data: {
        id: authorId,
        email: `${authorId}@example.com`,
        name: 'Author User',
        role: 'USER',
      },
    });

    await db.uploadedFile.create({
      data: {
        id: fileId,
        userId: authorId,
        originalName: 'sacred-abhang.txt',
        sizeBytes: 1024,
        mimeType: 'text/plain',
        format: 'document',
        storagePath: '/uploads/test.txt',
      },
    });

    await db.moderationQueue.create({
      data: {
        id: queueId,
        sourceType: 'upload',
        sourceId: fileId,
        uploadedFileId: fileId,
        draftTitle: 'संत तुकाराम महाराज अभंग',
        draftText: 'जे का रंजले गांजले...',
        status: 'pending',
      },
    });

    try {
      let threw = false;
      try {
        await submitPeerVote(authorId, queueId, 'approve');
      } catch (err: any) {
        threw = true;
        expect(err.message).toBe('Authors are not permitted to review or vote on their own submissions.');
      }
      expect(threw).toBe(true);
    } finally {
      await db.moderationQueue.delete({ where: { id: queueId } }).catch(() => {});
      await db.uploadedFile.delete({ where: { id: fileId } }).catch(() => {});
      await db.user.delete({ where: { id: authorId } }).catch(() => {});
    }
  });

  it('TC-ADMIN-001: requireAdmin rejects unauthenticated sessions with 401', async () => {
    mockSession = null;
    const res = await requireAdmin();
    expect('error' in res).toBe(true);
    if ('error' in res) {
      expect(res.error.status).toBe(401);
    }
  });

  it('TC-ADMIN-002: requireAdmin rejects non-admin users with 403', async () => {
    mockSession = { user: { id: 'user-1', email: 'user@example.com', role: 'USER' } };
    const res = await requireAdmin();
    expect('error' in res).toBe(true);
    if ('error' in res) {
      expect(res.error.status).toBe(403);
    }
  });

  it('TC-ADMIN-003: requireAdmin permits ADMIN role', async () => {
    mockSession = { user: { id: 'admin-1', email: 'admin@warkari.org', role: 'ADMIN', name: 'Admin' } };
    const res = await requireAdmin();
    expect('session' in res).toBe(true);
    if ('session' in res) {
      expect(res.session.role).toBe('ADMIN');
      expect(res.session.email).toBe('admin@warkari.org');
    }
  });
});
