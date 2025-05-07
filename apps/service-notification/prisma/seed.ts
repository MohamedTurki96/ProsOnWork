import { faker } from '@faker-js/faker';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { NotificationType, PrismaClient } from '../src/prisma';

const prisma = new PrismaClient();

/* ---------- Helpers ---------- */

function bookingContent(): {
  reservationId: number;
  productId: number;
  startDate: Date;
  status: string;
} {
  return {
    reservationId: faker.number.int({ min: 1, max: 10 }),
    productId: faker.number.int({ min: 1, max: 10 }),
    startDate: faker.date.future(),
    status: faker.helpers.arrayElement([
      "pending",
      "confirmed",
      "canceled",
    ]),
  };
}

function messageContent(userId: number): {
  chatId: number;
  senderId: number;
  messagePreview: string;
} {
  return {
    chatId: faker.number.int({ min: 1, max: 10 }),
    senderId: userId,
    messagePreview: faker.lorem.sentence(),
  };
}

function paymentContent(): {
  paymentId: number;
  amount: number;
  status: string;
} {
  return {
    paymentId: faker.number.int({ min: 1, max: 10 }),
    amount: parseFloat(faker.finance.amount({ min: 5, max: 250, dec: 2 })),
    status: faker.helpers.arrayElement([
      "pending",
      "completed",
      "failed",
    ]),
  };
}

function feedbackContent(): {
  feedbackId: number;
  productId: number;
  isReply: boolean;
  rating: number;
} {
  return {
    feedbackId: faker.number.int({ min: 1, max: 10 }),
    productId: faker.number.int({ min: 1, max: 10 }),
    isReply: faker.datatype.boolean({ probability: 0.2 }),
    rating: faker.number.int({ min: 1, max: 5 }),
  };
}

function systemContent(): { title: string; body: string } {
  return {
    title: 'Scheduled Maintenance',
    body: `The platform will be offline on ${faker.date
      .soon({ days: 7 })
      .toLocaleDateString()}.`,
  };
}

/* ---------- Seed routine ---------- */

async function seed() {
  await prisma.$transaction(async (client) => {
    const notifTypes: NotificationType[] = [
      NotificationType.booking,
      NotificationType.message,
      NotificationType.payment,
      NotificationType.feedback,
      NotificationType.system,
    ];

    await Promise.all(
      Array.from({ length: 10 }, () => {
        const type = faker.helpers.arrayElement(notifTypes);
        let content: any;
        const userId = faker.number.int({ min: 1, max: 10 });

        switch (type) {
          case NotificationType.booking:
            content = bookingContent();
            break;
          case NotificationType.message:
            content = messageContent(userId);
            break;
          case NotificationType.payment:
            content = paymentContent();
            break;
          case NotificationType.feedback:
            content = feedbackContent();
            break;
          default:
            content = systemContent();
        }

        return client.notification.create({
          data: {
            userId,
            type,
            content,
            isRead: faker.datatype.boolean({ probability: 0.3 }),
          },
        });
      }),
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Notification seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
