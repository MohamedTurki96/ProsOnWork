import { loadAppVersion } from "@pros-on-work/utils"

import { SetupOptions } from "./setup.interfaces"

export async function setupEnvironmentVariables(options: SetupOptions) {
  const port = parseInt(process.env["PORT"]!, 10)

  if (isNaN(port) || port === 0) {
    throw new Error("PORT environment variable is missing")
  }

  process.env["APP_VERSION"] = loadAppVersion(options.rootPath)

  process.env["SERVER_FS_PATH"] = options.rootPath
  process.env["SERVER_BASE_PATH"] = process.env["SERVER_BASE_PATH"] || ""

  if (!process.env["SERVER_HOST"]) {
    process.env["SERVER_HOST"] = `http://localhost:${port}`
  }

    if (!process.env["FRONTEND_URL"]) {
    process.env["FRONTEND_URL"] = `http://localhost:3000`
  }
}
