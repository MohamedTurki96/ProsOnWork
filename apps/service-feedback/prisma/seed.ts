import { faker } from '@faker-js/faker';

import { PrismaClient, ReclamationStatus } from '../src/prisma';

const prisma = new PrismaClient();

/* ---------- Sample texts so we don’t end up with pure “lorem ipsum” ---------- */
const reviewSamples = [
  'Excellent quality, exactly as described.',
  'Great value for money—highly recommended!',
  'Average experience; could have been better.',
  'Not satisfied with the durability of the product.',
  'Amazing service and speedy delivery.',
];
const reclamationSamples = [
  'Package arrived damaged.',
  'Item has missing parts.',
  'Received the wrong product.',
  'Product stopped working after one week.',
  'Need a replacement or refund.',
];

async function seed() {
  await prisma.$transaction(async (client) => {
    /* ---------- FEEDBACK ---------- */
    // 7 root feedbacks …
    const rootFeedbacks = await Promise.all(
      Array.from({ length: 7 }, () =>
        client.feedback.create({
          data: {
            userId: faker.number.int({ min: 1, max: 10 }),
            productId: faker.number.int({ min: 1, max: 10 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.helpers.arrayElement(reviewSamples),
          },
        })
      )
    );

    // … plus 3 replies to random roots
    await Promise.all(
      Array.from({ length: 3 }, () => {
        const parent = faker.helpers.arrayElement(rootFeedbacks);
        return client.feedback.create({
          data: {
            userId: faker.number.int({ min: 1, max: 10 }),
            productId: parent.productId,
            parentId: parent.id,
            // replies often omit rating
            rating: null,
            comment: faker.helpers.arrayElement(reviewSamples),
          },
        });
      })
    );

    /* ---------- RECLAMATIONS ---------- */
    await Promise.all(
      Array.from({ length: 10 }, () =>
        client.reclamation.create({
          data: {
            userId: faker.number.int({ min: 1, max: 10 }),
            productId: faker.number.int({ min: 1, max: 10 }),
            comment: faker.helpers.arrayElement(reclamationSamples),
            status: faker.helpers.arrayElement([
              ReclamationStatus.open,
              ReclamationStatus.inProgress,
              ReclamationStatus.resolved,
            ]),
          },
        })
      )
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Feedback & Reclamation seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
