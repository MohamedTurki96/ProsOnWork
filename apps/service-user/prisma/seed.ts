import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

import { PrismaClient, UserPlan, UserRole } from '../src/prisma';

const prisma = new PrismaClient();

function randomGeoLocation(): string {
  // Generates "longitude|latitude" with valid ranges
  const lng = faker.location.longitude({ min: -180, max: 180, precision: 6 });
  const lat = faker.location.latitude({ min: -90, max: 90, precision: 6 });
  return `${lng}|${lat}`;
}

async function seed() {
  await prisma.$transaction(async (client) => {
    /* ---------- Users ---------- */
    const users = await Promise.all(
      Array.from({ length: 10 }, (_, i) => {
        const role: UserRole =
          i === 0
            ? UserRole.admin
            : i <= 2
              ? UserRole.serviceProvider
              : UserRole.client;

        const email =
          i == 0
            ? 'admin@dev.com'
            : i <= 2
              ? `provider${i - 1}@dev.com`
              : `client${i - 3}@dev.com`;

        return client.user.create({
          data: {
            name: faker.person.firstName(),
            email: email,
            password: bcrypt.hashSync('password', 10),
            role,
            phone: faker.phone.number({ style: 'international' }),
            avatarId: 25,
            address: Math.random() < 0.6 ? randomGeoLocation() : null,
            emailVerifiedAt: faker.date.recent({ days: 30 }),
            plan: role == UserRole.serviceProvider ? UserPlan.basic : null,
          },
        });
      }),
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  User-related seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
