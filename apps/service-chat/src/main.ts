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
      name: "test-events",
      subjects: ["event.test.*"],
      storage: StorageType.File,
      retention: RetentionPolicy.Interest,
      max_age: 3 * 24 * 60 * 60 * 10 ** 9, // 3 days in nano seconds
    },
  ],
}).then(({ listen }) => listen())
