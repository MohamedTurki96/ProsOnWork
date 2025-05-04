import { Module } from '@nestjs/common';
import { DatabaseModule, ProsOnWorkCoreModule } from '@pros-on-work/core';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { createPrismaClient } from './db';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { WorkerController } from './worker/worker.controller';
import { WorkerService } from './worker/worker.service';

@Module({
  imports: [
    ProsOnWorkCoreModule.forRoot({
      health: {
        database: { enabled: false },
        nats: { enabled: true },
      },
    }),
    DatabaseModule.forPrisma(createPrismaClient()),
  ],
  providers: [CategoryService, ShopService, WorkerService, ProductService],
  controllers: [
    CategoryController,
    ShopController,
    WorkerController,
    ProductController,
  ],
})
export class UserServiceModule {}
