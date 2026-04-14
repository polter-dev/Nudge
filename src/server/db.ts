import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Grab your pooled connection string for the app
const connectionString = process.env.DATABASE_URL;

// 2. Initialize the Postgres Pool and the Prisma Adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 3. Pass the adapter into the PrismaClient!
// (If you have globalForPrisma setup in this file, just add { adapter } to the new PrismaClient constructor)
export const db = new PrismaClient({ adapter });