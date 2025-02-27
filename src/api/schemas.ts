import { z } from 'zod';

export const signSchema = z.object({
  email: z.string().max(50).email('Email invalid'),
  password: z.string().min(2).max(50),
});

export type Sign = z.infer<typeof signSchema>;

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

export const createSiteSchema = z.object({
  name: z.string().min(2),
  workspaceId: z.string().cuid2(),
  domainId: z.string().cuid2(),
  apiKeyId: z.string().cuid2(),
});

export type CreateSite = z.infer<typeof createSiteSchema>;
