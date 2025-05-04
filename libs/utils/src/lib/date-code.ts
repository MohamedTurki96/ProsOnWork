import {
  isDate,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator"
import { isString, toNumber } from "lodash"
import moment from "moment"

export function isDateCode(data: unknown): data is string {
  return (
    isString(data) &&
    /date\.now((-|\+)([1-9][0-9]*)(y|M|d|h|m|s))?/gs.test(data)
  )
}

export function createValueFromDateCode(
  data: string | Date,
  startOf?: "day"
): moment.Moment {
  if (!isDateCode(data)) {
    return moment(data)
  }

  const abstractDate = data.replace("date.now", "")

  let result = moment()

  if (startOf) {
    result = result.startOf(startOf)
  }

  if (abstractDate?.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_match, sign, amount, shorthand] = abstractDate.split(
      /(-|\+)([1-9][0-9]*)(y|M|d|h|m|s)/gs
    )

    return result.add(toNumber(sign + amount), shorthand as "y")
  }

  return result
}

@ValidatorConstraint({ async: false, name: "datecode" })
export class ValidateDateOrDateCode implements ValidatorConstraintInterface {
  public validate(value: string | Date): boolean {
    return isDateCode(value) || isDate(value)
  }

  public defaultMessage() {
    return `Value is no date or date code`
  }
}

export function IsDateOrDateCode(): ReturnType<typeof Validate> {
  return Validate(ValidateDateOrDateCode)
}
