import { BadRequestException } from "@nestjs/common"
import { validate as validateCore } from "class-validator"

import { resolveError } from "./validation.pipe"

export async function validate(input: object) {
  const errors = await validateCore(input)

  if (errors?.length) {
    throw new BadRequestException(JSON.stringify(resolveError(errors)))
  }
}
