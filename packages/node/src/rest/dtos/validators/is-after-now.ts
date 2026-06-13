import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isAfterNow", async: false })
class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    if (!(value instanceof Date)) {
      return false;
    }
    return value.getTime() > Date.now();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in the future`;
  }
}

/**
 * Validates that a {@link Date} property is strictly after the current
 * server time. Unlike `class-validator`'s built-in `@MinDate(new Date())`,
 * which captures the timestamp at module load (boot time) and never
 * refreshes, this decorator evaluates `Date.now()` on every request.
 */
export function IsAfterNow(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAfterNowConstraint,
    });
  };
}
