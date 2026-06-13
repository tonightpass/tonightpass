import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

type MediaShape = {
  flyers?: unknown[];
  trailers?: unknown[];
};

/**
 * Create-time check: at least one flyer or trailer must be present.
 */
@ValidatorConstraint({ name: "atLeastOneMedia", async: false })
export class AtLeastOneMediaConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments) {
    const object = args.object as MediaShape;
    const flyers = object.flyers || [];
    const trailers = object.trailers || [];
    return flyers.length > 0 || trailers.length > 0;
  }

  defaultMessage() {
    return "At least one flyer or trailer must be provided";
  }
}

export function AtLeastOneMedia(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneMediaConstraint,
    });
  };
}

/**
 * Update-time check: if the request touches `flyers` and/or `trailers`, the
 * resulting set must still contain at least one item. Omitting both fields
 * means "no change to media" and is allowed.
 */
@ValidatorConstraint({ name: "atLeastOneMediaOnUpdate", async: false })
export class AtLeastOneMediaOnUpdateConstraint
  implements ValidatorConstraintInterface
{
  validate(_value: unknown, args: ValidationArguments) {
    const object = args.object as MediaShape;

    if (object.flyers !== undefined && object.trailers !== undefined) {
      return object.flyers.length > 0 || object.trailers.length > 0;
    }
    if (object.flyers !== undefined && object.trailers === undefined) {
      return object.flyers.length > 0;
    }
    if (object.trailers !== undefined && object.flyers === undefined) {
      return object.trailers.length > 0;
    }
    return true;
  }

  defaultMessage() {
    return "Cannot remove all media from event. At least one flyer or trailer must remain";
  }
}

export function AtLeastOneMediaOnUpdate(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneMediaOnUpdateConstraint,
    });
  };
}
