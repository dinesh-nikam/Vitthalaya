/**
 * Shared in-memory mock DB client for unit tests
 * Prevents mock collision between parallel test runners
 */

export const mockUsers = new Map<string, any>();
export const mockFiles = new Map<string, any>();
export const mockQueues = new Map<string, any>();
export const mockReviews = new Map<string, any>();
export const mockOrders = new Map<string, any>();

function createDefaultModelDelegate() {
  return {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: data?.id || 'mock-id', ...data }),
    createMany: async () => ({ count: 0 }),
    update: async ({ data }: any) => ({ id: 'mock-id', ...data }),
    updateMany: async () => ({ count: 0 }),
    upsert: async ({ create }: any) => ({ id: create?.id || 'mock-id', ...create }),
    delete: async () => true,
    deleteMany: async () => ({ count: 0 }),
    count: async () => 0,
    groupBy: async () => [],
    aggregate: async () => ({}),
  };
}

const baseMockDb: Record<string, any> = {
  user: {
    findUnique: async ({ where }: any) => mockUsers.get(where.id) || null,
    create: async ({ data }: any) => {
      mockUsers.set(data.id, data);
      return data;
    },
    delete: async ({ where }: any) => {
      mockUsers.delete(where.id);
      return true;
    },
  },
  uploadedFile: {
    findUnique: async ({ where }: any) => mockFiles.get(where.id) || null,
    create: async ({ data }: any) => {
      mockFiles.set(data.id, data);
      return data;
    },
    delete: async ({ where }: any) => {
      mockFiles.delete(where.id);
      return true;
    },
  },
  moderationQueue: {
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
  },
  moderationReview: {
    create: async ({ data }: any) => {
      const id = data.id || `review-${Date.now()}`;
      mockReviews.set(id, { id, ...data });
      return data;
    },
  },
  order: {
    findUnique: async ({ where }: any) => mockOrders.get(where.id) || null,
    create: async ({ data }: any) => {
      mockOrders.set(data.id, { ...data });
      return data;
    },
    update: async ({ where, data }: any) => {
      const existing = mockOrders.get(where.id);
      if (!existing) throw new Error('Record not found');
      const updated = { ...existing, ...data };
      mockOrders.set(where.id, updated);
      return updated;
    },
    delete: async ({ where }: any) => {
      mockOrders.delete(where.id);
      return true;
    },
  },
  $transaction: async (arg: any) => {
    if (typeof arg === 'function') {
      return arg(sharedMockDb);
    }
    return Promise.all(arg);
  },
};

const delegateCache = new Map<string, any>();

export const sharedMockDb: any = new Proxy(baseMockDb, {
  get(target, prop: string | symbol) {
    if (typeof prop !== 'string') return (target as any)[prop];
    if (prop in target) return target[prop];
    if (!delegateCache.has(prop)) {
      delegateCache.set(prop, createDefaultModelDelegate());
    }
    return delegateCache.get(prop);
  },
});
