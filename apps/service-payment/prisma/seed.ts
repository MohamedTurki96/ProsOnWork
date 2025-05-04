
import { PrismaClient } from '../src/prisma';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction(async (client) => {});
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
