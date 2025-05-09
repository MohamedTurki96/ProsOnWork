
import { PrismaClient } from '../src/prisma';

const prisma = new PrismaClient();

const mediaFiles = [
  { filename: 'construction-img.webp',  mimeType: 'image/webp',   size: 142394 },
  { filename: 'construction-icon.svg',  mimeType: 'image/svg+xml', size:  9249 },
  { filename: 'electrical-img.jpg',     mimeType: 'image/jpeg',    size: 300765 },
  { filename: 'electrical-icon.svg',    mimeType: 'image/svg+xml', size:  12347 },
  { filename: 'plumber-img.webp',       mimeType: 'image/webp',    size: 110684 },
  { filename: 'plumber-icon.svg',       mimeType: 'image/svg+xml', size:   9997 },
  { filename: 'carpenter-img.webp',     mimeType: 'image/webp',    size:  84254 },
  { filename: 'carpenter-icon.svg',     mimeType: 'image/svg+xml', size:  10229 },
  { filename: 'interior-img.webp',      mimeType: 'image/webp',    size:  97202 },
  { filename: 'interior-icon.svg',      mimeType: 'image/svg+xml', size:  10164 },
  { filename: 'cleaning-img.webp',      mimeType: 'image/webp',    size:  62384 },
  { filename: 'cleaning-icon.svg',      mimeType: 'image/svg+xml', size:   9239 },
  { filename: 'delivery-img.webp',      mimeType: 'image/webp',    size:  42998 },
  { filename: 'delivery-icon.svg',      mimeType: 'image/svg+xml', size:  11373 },
  { filename: 'cartransport-img.webp',  mimeType: 'image/webp',    size: 176930 },
  { filename: 'cartransport-icon.svg',  mimeType: 'image/svg+xml', size:   8916 },
  { filename: 'carwash-img.jpg',        mimeType: 'image/jpeg',    size: 188164 },
  { filename: 'carwash-icon.svg',       mimeType: 'image/svg+xml', size:   7276 },
  { filename: 'barber-img.webp',        mimeType: 'image/webp',    size:  64598 },
  { filename: 'barber-icon.svg',        mimeType: 'image/svg+xml', size:  13085 },
  { filename: 'nails-img.webp',         mimeType: 'image/webp',    size:  88222 },
  { filename: 'nails-icon.svg',         mimeType: 'image/svg+xml', size:   6467 },
  { filename: 'computer-img.webp',      mimeType: 'image/webp',    size:  84410 },
  { filename: 'computer-icon.svg',      mimeType: 'image/svg+xml', size:   9208 },
] as const;

async function seed() {
  await prisma.$transaction(async (client) => {
    await client.media.createMany({
      data: mediaFiles.map(({ filename, mimeType, size }, index) => ({
        id: index + 1,
        filename,
        filePath: filename,
        mimeType,
        size,
      })),
      skipDuplicates: true,
    });

    const userAvatar = "user-avatar.png";

    await client.media.create({
      data: {
        filename: userAvatar,
        filePath: userAvatar,
        mimeType: "image/png",
        size : 16277,
      }
    })
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Media seed data created.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
