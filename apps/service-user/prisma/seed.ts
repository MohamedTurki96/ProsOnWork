import { faker } from "@faker-js/faker";
import * as bcrypt from 'bcrypt';

import {  PrismaClient, UserRole } from "../src/prisma";


const prisma = new PrismaClient()

async function seed() {
  await prisma.$transaction(async (client) => {

    await client.user.create({
      data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        emailVerifiedAt: new Date(),
        password: await bcrypt.hash("password", 10),
        role: UserRole.admin,
        createdAt: new Date(),
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
