// lib/db/index.ts
import { drizzle } from 'drizzle-orm/neon-http'; // ✅ correct adapter for serverless Neon HTTP
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!); // NeonQueryFunction<false, false>
export const db = drizzle(sql, { schema });   

export { sql };
