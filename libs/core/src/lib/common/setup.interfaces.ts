import type { StreamConfig } from "nats"

export interface SetupOptions {
  rootPath: string
  streams?: Partial<StreamConfig>[]
}
