import { defineConfig } from "prisma"; // Correct import for Prisma 4+
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  // migrations can be uncommented if needed
  // migrations: {
  //   path: "prisma/migrations",
  // },
});
