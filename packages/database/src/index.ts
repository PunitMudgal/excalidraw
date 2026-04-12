import path from "node:path";
import dotenv from "dotenv";
import { PrismaClient, Prisma } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// Load the package-local env file so workspace apps do not need to set DATABASE_URL
// themselves before importing the shared database client.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required for @repo/database. Set it in packages/database/.env or the environment before starting the backend.",
  );
}

export const prismaClient = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
});

export { Prisma };
