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
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/events\/flyers\/|organizations\/[\w-]+\/events\/[\w-]+\/flyers\/)/,
    { each: true },
  )
  @AtLeastOneMedia()
  flyers: string[];

  @IsArray()
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/events\/trailers\/|organizations\/[\w-]+\/events\/[\w-]+\/trailers\/)/,
    { each: true },
  )
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
