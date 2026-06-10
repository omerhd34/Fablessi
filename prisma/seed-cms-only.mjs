import { PrismaClient } from "@prisma/client";
import { seedCms } from "./seed-cms.mjs";

const prisma = new PrismaClient();

await seedCms(prisma);
await prisma.$disconnect();
