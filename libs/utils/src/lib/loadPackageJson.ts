import { existsSync, readFileSync } from "fs"
import { join } from "path"

export interface PackageJSON {
  version: string
  name: string
  type: string
}

export function loadPackageJSON(path: string): PackageJSON | null {
  const PACKAGE_JSON = join(path, "package.json")
  return existsSync(PACKAGE_JSON)
    ? JSON.parse(readFileSync(PACKAGE_JSON, "utf-8"))
    : null
}

export function loadAppVersion(path: string) {
  return loadPackageJSON(path)?.version
}
