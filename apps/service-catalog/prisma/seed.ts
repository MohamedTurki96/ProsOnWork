// prisma/seed.ts
import { faker } from '@faker-js/faker';

import { PriceType, PrismaClient, ProductType } from '../src/prisma';

const prisma = new PrismaClient();

const sampleIncludes = [
  'Installation',
  'Spare parts',
  'User manual',
  '24h support',
  'On-site training',
  'Extended warranty',
];
function randId() {
  return faker.number.int({ min: 1, max: 10 }); 
}

const categoriesData = [
  { name: 'Construction',  imageId: 1,  iconId: 2  },
  { name: 'Electrical',    imageId: 3,  iconId: 4  },
  { name: 'Plumber',       imageId: 5,  iconId: 6  },
  { name: 'Carpenter',     imageId: 7,  iconId: 8  },
  { name: 'Interior',      imageId: 9,  iconId: 10 },
  { name: 'Cleaning',      imageId: 11, iconId: 12 },
  { name: 'Delivery',      imageId: 13, iconId: 14 },
  { name: 'Car Transport', imageId: 15, iconId: 16 },
  { name: 'Car Wash',      imageId: 17, iconId: 18 },
  { name: 'Barber',        imageId: 19, iconId: 20 },
  { name: 'Nails',         imageId: 21, iconId: 22 },
  { name: 'Computer',      imageId: 23, iconId: 24 },
] as const;

async function seed() {
  await prisma.$transaction(async (client) => {
    /* ----------------- CATEGORIES ----------------- */
    const categories = await Promise.all(
      categoriesData.map((category) =>
        client.category.create({
          data: {
            name: category.name,
            iconId: category.iconId,
            imageId: category.imageId,
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
            medias: [1]
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
