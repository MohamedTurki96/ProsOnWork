import { faker } from '@faker-js/faker';

import { PrismaClient, ReservationStatus } from '../src/prisma';

const prisma = new PrismaClient();

const randId = () => faker.number.int({ min: 1, max: 10 });

async function seed() {
  await prisma.$transaction(async (client) => {
    await Promise.all(
      Array.from({ length: 10 }, () => {
        // 1–30 days in the future
        const startDate = faker.date.soon({ days: 30 });
        // 1–10 days after start
        const endDate = faker.date.soon({
          days: faker.number.int({ min: 1, max: 10 }),
          refDate: startDate,
        });

        return client.reservation.create({
          data: {
            userId: randId(),
            productId: randId(),
            startDate,
            endDate,
            status: ReservationStatus.pending,
          },
        });
      }),
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Reservation seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
