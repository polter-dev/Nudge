import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma CLI will use this direct connection for migrations/pulling
    url: env("DIRECT_URL"),
  },
});