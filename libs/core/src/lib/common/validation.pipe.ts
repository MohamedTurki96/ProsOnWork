import {
  ArgumentMetadata,
  BadRequestException,
  ValidationError as ValidationErrorType,
  ValidationPipe,
} from "@nestjs/common"
import { TRANSFORM_OPTIONS } from "@pros-on-work/resources"

import { NatsJetStreamContext } from "../nats-transport/context"

export class ValidationError extends BadRequestException {
  constructor(errors: Record<string, string> | string) {
    super(typeof errors === "string" ? errors : JSON.stringify(errors))
  }
}

export class ClassValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      validateCustomDecorators: true,
      forbidUnknownValues: true,
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: TRANSFORM_OPTIONS,
      exceptionFactory(errors: ValidationErrorType[]) {
        return new ValidationError(resolveError(errors))
      },
    })
  }

  override toValidate(metadata: ArgumentMetadata): boolean {
    // Do no validate nats context because "message" on context results to => Maximum call stack size exceeded
    if (metadata.metatype?.name === NatsJetStreamContext.name) {
      return false
    }

    return super.toValidate(metadata)
  }
}

export function resolveError(
  errors: ValidationErrorType[],
  parent = ""
): Record<string, string> {
  return errors.reduce(
    (res, el) => {
      // TODO: el.property can be undefined
      const identifier = parent ? `${parent}.${el.property}` : el.property
      if (el.children?.length) {
        return { ...res, ...resolveError(el.children, identifier) }
      } else if (el.constraints) {
        res[identifier] = Object.values(el.constraints).join(", ")
      }
      return res
    },
    {} as Record<string, string>
  )
}
