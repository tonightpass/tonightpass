import { Type, Transform } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MinDate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";

import {
  CreateOrganizationEventTicketDto,
  CreateOrganizationEventTicketInput,
} from "./tickets";
import { REGEX } from "../../../../constants";
import {
  OrganizationEventType,
  OrganizationEventVisibilityType,
  OrganizationEvent,
  ExcludeBase,
} from "../../../types";
import { CreateLocationDto } from "../../locations/create-location.dto";

@ValidatorConstraint({ name: "atLeastOneMedia", async: false })
export class AtLeastOneMediaConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments) {
    const object = args.object as CreateOrganizationEventDto;
    const flyers = object.flyers || [];
    const trailers = object.trailers || [];

    return flyers.length > 0 || trailers.length > 0;
  }

  defaultMessage() {
    return "At least one flyer or trailer must be provided";
  }
}

export function AtLeastOneMedia(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneMediaConstraint,
    });
  };
}

export type CreateOrganizationEventInput = Omit<
  ExcludeBase<OrganizationEvent>,
  | "slug"
  | "styles"
  | "tickets"
  | "organization"
  | "viewsCount"
  | "sessionsCount"
  | "totalViewsCount"
  | "averageViewsPerSessionCount"
> & {
  slug?: string;
  styles: string[];
  tickets: CreateOrganizationEventTicketInput[];
};

export class CreateOrganizationEventDto
  implements CreateOrganizationEventInput
{
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  title: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.SLUG)
  slug?: string;

  @IsString()
  @IsNotEmpty()
  @Length(16, 2048)
  description: string;

  @IsEnum(OrganizationEventType)
  @IsNotEmpty()
  type: OrganizationEventType;

  @IsEnum(OrganizationEventVisibilityType)
  @IsNotEmpty()
  visibility: OrganizationEventVisibilityType;

  @IsArray()
  @IsUrl({}, { each: true })
  @AtLeastOneMedia()
  flyers: string[];

  @IsArray()
  @IsUrl({}, { each: true })
  trailers: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  @IsNotEmpty()
  location: CreateLocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrganizationEventTicketDto)
  @IsNotEmpty()
  tickets: CreateOrganizationEventTicketDto[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  styles: string[]; // Array of style IDs

  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @IsNotEmpty()
  @MinDate(new Date())
  startAt: Date;

  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @IsNotEmpty()
  @MinDate(new Date())
  endAt: Date;
}
