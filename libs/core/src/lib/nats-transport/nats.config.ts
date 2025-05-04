import { ConnectionOptions } from "nats"

export function loadNatsConnectionOptions(): ConnectionOptions {
  const appName = process.env["APP_NAME"]
  const name = `${appName}-server`
  const user = process.env["NATS_USER"]
  const pass = process.env["NATS_PASS"]
  const servers = (
    process.env["NATS_SERVERS"] ?? "nats://localhost:52709"
  ).split(",")
  const debug = process.env["NATS_DEBUG"] === "true"

  return {
    name,
    user,
    pass,
    servers,
    debug,
  }
}
