import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(50),
});

export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>;

export const createDomainSchema = z.object({
  name: z.string().min(2).max(50),
  workspaceId: z.string().cuid2(),
});

export type CreateDomain = z.infer<typeof createDomainSchema>;

export const createApiKeySchema = z.object({
  name: z.string().min(2),
  value: z.string().min(2),
  workspaceId: z.string().cuid2(),
});

export type CreateApiKey = z.infer<typeof createApiKeySchema>;
