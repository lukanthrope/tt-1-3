import { z } from 'zod';
import 'dotenv/config';

const configSchema = z.object({
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_URL: z.string(),
  PORT: z.number().optional().default(8000),
});

const env = configSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export const config = env.data;
