import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(50),
});

export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>;
