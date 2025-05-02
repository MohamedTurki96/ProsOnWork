import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsGeoLocationConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments): boolean {
    if (typeof value !== 'string' || !value.includes('|')) return false;

    const [lng, lat] = value.split('|').map(Number);

    if (isNaN(lat) || isNaN(lng)) return false;

    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'GeoLocation must be a string "longitude|latitude" with valid coordinates';
  }
}

export function IsGeoLocation(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isGeoLocation',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsGeoLocationConstraint,
    });
  };
}
