// prisma/seed.ts
import { faker } from '@faker-js/faker';

import { PriceType, PrismaClient, ProductType } from '../src/prisma';

const prisma = new PrismaClient();

/* ---------- helpers ---------- */
const sampleIncludes = [
  'Installation',
  'Spare parts',
  'User manual',
  '24h support',
  'On-site training',
  'Extended warranty',
];
function randId() {
  return faker.number.int({ min: 1, max: 10 }); // for ownerId / iconId / imageId
}

async function seed() {
  await prisma.$transaction(async (client) => {
    /* ----------------- CATEGORIES ----------------- */
    const categories = await Promise.all(
      Array.from({ length: 10 }, () =>
        client.category.create({
          data: {
            name: faker.commerce.department(),
            iconId: randId(),
            imageId: randId(),
          },
        }),
      ),
    );

    /* ----------------- SHOPS ---------------------- */
    const shops = await Promise.all(
      categories.map(() =>
        client.shop.create({
          data: {
            name: `${faker.company.name()} Shop`,
            address: `${faker.location.longitude({
              precision: 5,
            })}|${faker.location.latitude({ precision: 5 })}`,
            ownerId: randId(), // 1‑10
          },
        }),
      ),
    );

    /* ----------------- WORKERS -------------------- */
    const workers = await Promise.all(
      shops.map((shop) =>
        client.worker.create({
          data: {
            name: faker.person.fullName(),
            phone: faker.phone.number({style: "international"}),
            shopId: shop.id,
          },
        }),
      ),
    );

    /* ----------------- PRODUCTS ------------------- */
    const products = await Promise.all(
      Array.from({ length: 10 }, () => {
        const category = faker.helpers.arrayElement(categories);
        const shop = faker.helpers.arrayElement(shops);

        return client.product.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(
              faker.finance.amount({ min: 10, max: 300, dec: 2 }),
            ),
            // includes: string[]  (max 3)
            includes: faker.helpers.arrayElements(sampleIncludes, 3),
            // faq: FaqDTO[]  (2 entries)
            faq: [
              {
                question: 'Is there a warranty?',
                answer: 'Yes, 12 months included.',
              },
              {
                question: 'Can I get a discount?',
                answer: 'Bulk orders qualify for discounts.',
              },
            ],
            type: faker.helpers.arrayElement([
              ProductType.service,
              ProductType.equipment,
            ]),
            priceType: faker.helpers.arrayElement([
              PriceType.hour,
              PriceType.package,
            ]),
            categoryId: category.id,
            shopId: shop.id,
          },
        });
      }),
    );

    /* ---- link each product with at least one worker in the same shop ---- */
    await Promise.all(
      products.map((p) => {
        const sameShopWorkers = workers.filter((w) => w.shopId === p.shopId);
        const pick = faker.helpers.arrayElement(sameShopWorkers);
        return client.product.update({
          where: { id: p.id },
          data: { workers: { connect: { id: pick.id } } },
        });
      }),
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Category, Shop, Product & Worker seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
