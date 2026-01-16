import { Transform, Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinDate,
  registerDecorator,
  ValidateNested,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from "class-validator";
import { REGEX } from "../../../../constants";
import {
  type ExcludeBase,
  type OrganizationEvent,
  OrganizationEventType,
  OrganizationEventVisibilityType,
} from "../../../types";
import { CreateLocationDto } from "../../locations/create-location.dto";
import {
  CreateOrganizationEventTicketDto,
  type CreateOrganizationEventTicketInput,
} from "./tickets";

@ValidatorConstraint({ name: "atLeastOneMedia", async: false })
export class AtLeastOneMediaConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments) {
    const object = args.object as BaseOrganizationEventDto;
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

export type CreateOrganizationEventInput = Omit<
  ExcludeBase<OrganizationEvent>,
  | "slug"
  | "styles"
  | "tickets"
  | "organization"
  | "status"
  | "viewsCount"
  | "sessionsCount"
  | "totalViewsCount"
  | "averageViewsPerSessionCount"
> & {
  slug?: string;
  styles: string[];
  tickets: CreateOrganizationEventTicketInput[];
};

// Base class for event details (without tickets)
export class BaseOrganizationEventDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  title: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.SLUG, {
    message: "organization.event.slug.format",
  })
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
  @ArrayMaxSize(25)
  @Matches(REGEX.EVENT_FLYER_URL, {
    each: true,
    message: "organization.event.flyers.url.invalid",
  })
  @AtLeastOneMedia()
  flyers: string[];

  @IsArray()
  @ArrayMaxSize(25)
  @Matches(REGEX.EVENT_TRAILER_URL, {
    each: true,
    message: "organization.event.trailers.url.invalid",
  })
  trailers: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  @IsNotEmpty()
  location: CreateLocationDto;

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

export class CreateOrganizationEventDto
  extends BaseOrganizationEventDto
  implements CreateOrganizationEventInput
{
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrganizationEventTicketDto)
  @IsNotEmpty()
  tickets: CreateOrganizationEventTicketDto[];
}
