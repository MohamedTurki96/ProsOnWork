process.on("uncaughtException", function (err) {
  console.error("Uncaught exception", err)
})

import { setupApp } from "@pros-on-work/core"
import { RetentionPolicy, StorageType } from "nats"

const modLoader = () => import("./module").then((d) => d.UserServiceModule)
/* eslint-enable import/order */

setupApp(modLoader, {
  rootPath: __dirname,
  streams: [
    {
      name: "category-events",
      subjects: ["event.category.*"],
      storage: StorageType.File,
      retention: RetentionPolicy.Interest,
      max_age: 3 * 24 * 60 * 60 * 10 ** 9, // 3 days in nano seconds
    },
    {
      name: "shop-events",
      subjects: ["event.shop.*"],
      storage: StorageType.File,
      retention: RetentionPolicy.Interest,
      max_age: 3 * 24 * 60 * 60 * 10 ** 9, // 3 days in nano seconds
    },
    {
      name: "worker-events",
      subjects: ["event.worker.*"],
      storage: StorageType.File,
      retention: RetentionPolicy.Interest,
      max_age: 3 * 24 * 60 * 60 * 10 ** 9, // 3 days in nano seconds
    },
    {
      name: "product-events",
      subjects: ["event.product.*"],
      storage: StorageType.File,
      retention: RetentionPolicy.Interest,
      max_age: 3 * 24 * 60 * 60 * 10 ** 9, // 3 days in nano seconds
    },
  ],
}).then(({ listen }) => listen())
