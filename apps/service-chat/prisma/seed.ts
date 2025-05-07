import { faker } from '@faker-js/faker';

import { MessageType, PrismaClient } from '../src/prisma';

const prisma = new PrismaClient();

/** Pick `count` distinct integers between 1 and 10 */
function pickDistinctIds(count: number): number[] {
  const all = Array.from({ length: 10 }, (_, i) => i + 1);
  return faker.helpers.arrayElements(all, count);
}

async function seed() {
  await prisma.$transaction(async (client) => {
    /* ---------- CHATS & PARTICIPANTS ---------- */
    const chatInfos = await Promise.all(
      Array.from({ length: 5 }, async () => {
        const chat = await client.chat.create({ data: {} });

        const participantIds = pickDistinctIds(faker.number.int({ min: 2, max: 3 }));

        await Promise.all(
          participantIds.map((userId) =>
            client.chatUser.create({
              data: {
                chatId: chat.id,
                userId,
                joinedAt: faker.date.recent({ days: 30 }),
              },
            })
          )
        );

        return { chatId: chat.id, participantIds };
      })
    );

    /* ---------- MESSAGES ---------- */
    const msgTypes: MessageType[] = [
      MessageType.text,
      MessageType.file,
      MessageType.system,
    ];

    await Promise.all(
      chatInfos.flatMap(({ chatId, participantIds }) =>
        Array.from({ length: 10 }, () => {
          const type = faker.helpers.arrayElement(msgTypes);

          // Build message fields
          let content: string;
          let mediaId: number | null = null;
          let senderId: number;

          switch (type) {
            case MessageType.text:
              content = faker.lorem.sentences({ min: 1, max: 3 });
              senderId = faker.helpers.arrayElement(participantIds);
              break;

            case MessageType.file:
              content = faker.system.fileName();
              mediaId = faker.number.int({ min: 1, max: 10 }); // assume Media IDs 1‑10 exist
              senderId = faker.helpers.arrayElement(participantIds);
              break;

            default: // System
              content = faker.helpers.arrayElement([
                'Chat created',
                'User left the chat',
                'Participants added',
              ]);
              senderId = 0; // 0 = system
          }

          return client.message.create({
            data: {
              chatId,
              senderId,
              type,
              content,
              mediaId,
              createdAt: faker.date.recent({ days: 30 }),
            },
          });
        })
      )
    );
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Chat, ChatUser & Message seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
