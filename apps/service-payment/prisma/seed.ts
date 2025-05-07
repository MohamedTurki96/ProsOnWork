import { faker } from '@faker-js/faker';

import { PaymentStatus, PaymentType, PrismaClient  } from '../src/prisma';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction(async (client) => {
    /* ---------- Wallets ---------- */
    const walletPromises = Array.from({ length: 10 }, (_, i) =>
      client.wallet.create({
        data: {
          // In a real app these would map to actual users
          userId: i + 1,
          balance: parseFloat(
            faker.finance.amount({ min: 20, max: 500, dec: 2 }),
          ),
        },
      }),
    );

    const wallets = await Promise.all(walletPromises);

    /* ---------- Payments ---------- */
    const paymentTypes: PaymentType[] = [PaymentType.cashIn, PaymentType.cashOut, PaymentType.reservation];
    const paymentStatuses: PaymentStatus[] = [PaymentStatus.pending, PaymentStatus.completed, PaymentStatus.failed];

    const paymentPromises = Array.from({ length: 15 }, () => {
      const wallet = faker.helpers.arrayElement(wallets);
      return client.payment.create({
        data: {
          walletId: wallet.id,
          type: faker.helpers.arrayElement(paymentTypes),
          status: faker.helpers.arrayElement(paymentStatuses),
          amount: parseFloat(
            faker.finance.amount({ min: 5, max: 200, dec: 2 }),
          ),
        },
      });
    });

    await Promise.all(paymentPromises);
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Payment Seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
