import { z } from 'zod';

export const numericIdSchema = z.object({
  customerId: z
    .string()
    .min(1, 'Customer ID is required')
    .regex(/^\d+$/, 'Customer ID must be a number')
    .transform((s) => Number(s)),
});
