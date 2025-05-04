import { PrismaClient } from '../src/prisma';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction(async (client) => {
    await client.media.create({
      data: {
        filename: 'test-file.png',
        filePath: 'test-file.png',
        mimeType: 'image/jpeg',
        size: 1024, 
      },
    });
  });
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
