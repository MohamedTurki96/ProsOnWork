import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

import { PrismaClient, UserRole } from '../src/prisma';

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
        // Role mix: 1 admin, 2 service providers, rest clients
        let role: UserRole = UserRole.client;
        if (i === 0) role = UserRole.admin;
        else if (i <= 2) role = UserRole.serviceProvider;

        const plainPassword = faker.internet.password({ length: 12 });

        return client.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email({
              firstName: `user${i + 1}`,
              lastName: 'demo',
              provider: 'example.com',
            }),
            password: bcrypt.hashSync(plainPassword, 10),
            role,
            phone: faker.phone.number({style: "international"}),
            avatarId: i,
            // ~60 % of users get a geolocation address
            address: Math.random() < 0.6 ? randomGeoLocation() : null,
            emailVerifiedAt: i % 2 === 0 ? faker.date.recent({ days: 30 }) : null,
          },
        });
      })
    );

    /* ---------- Email‑verification tokens (for unverified users) ---------- */
    await Promise.all(
      users
        .filter((u) => !u.emailVerifiedAt)
        .map((u) =>
          client.emailVerificationToken.create({
            data: {
              email: u.email,
              token: faker.string.alphanumeric(32),
            },
          })
        )
    );

    /* ---------- Password‑reset tokens (three random users) ---------- */
    await Promise.all(
      faker.helpers
        .arrayElements(users, 3)
        .map((u) =>
          client.passwordResetToken.create({
            data: {
              email: u.email,
              token: faker.string.alphanumeric(32),
            },
          })
        )
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
