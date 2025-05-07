import { faker } from '@faker-js/faker';

import { PrismaClient } from '../src/prisma';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction(async (client) => {
    await Promise.all(
      Array.from({ length: 10 }, (_, i) => {
        const name = `test${i + 1}.jpg`; // -> filename & filePath
        return client.media.create({
          data: {
            filename: name,
            filePath: name,
            mimeType: 'image/jpeg',
            size: faker.number.int({ min: 1000, max: 5000 }),
          },
        });
      })
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Media seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
