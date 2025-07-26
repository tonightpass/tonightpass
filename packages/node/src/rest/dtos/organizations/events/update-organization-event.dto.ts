import { Type, Transform } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsLowercase,
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

import { CreateOrganizationEventInput } from "./create-organization-event.dto";
import { UpdateOrganizationEventTicketDto } from "./tickets";
import { REGEX } from "../../../../constants";
import {
  DeepPartial,
  OrganizationEventType,
  OrganizationEventVisibilityType,
} from "../../../types";
import { UpdateLocationDto } from "../../locations/update-location.dto";

@ValidatorConstraint({ name: "atLeastOneMediaOnUpdate", async: false })
export class AtLeastOneMediaOnUpdateConstraint
  implements ValidatorConstraintInterface
{
  validate(_value: unknown, args: ValidationArguments) {
    const object = args.object as UpdateOrganizationEventDto;

    // If both flyers and trailers are provided in the update
    if (object.flyers !== undefined && object.trailers !== undefined) {
      // At least one must have content
      return object.flyers.length > 0 || object.trailers.length > 0;
    }

    // If only flyers is provided, it must not be empty
    if (object.flyers !== undefined && object.trailers === undefined) {
      return object.flyers.length > 0;
    }

    // If only trailers is provided, it must not be empty
    if (object.trailers !== undefined && object.flyers === undefined) {
      return object.trailers.length > 0;
    }

    // If neither is provided, that's fine (no update to media)
    return true;
  }

  defaultMessage() {
    return "Cannot remove all media from event. At least one flyer or trailer must remain";
  }
}

export function AtLeastOneMediaOnUpdate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneMediaOnUpdateConstraint,
    });
  };
}

export class UpdateOrganizationEventDto
  implements DeepPartial<CreateOrganizationEventInput>
{
  @IsOptional()
  @IsString()
  @Length(1, 64)
  title?: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.SLUG)
  slug?: string;

  @IsOptional()
  @IsString()
  @Length(16, 2048)
  description?: string;

  @IsOptional()
  @IsEnum(OrganizationEventType)
  type?: OrganizationEventType;

  @IsOptional()
  @IsEnum(OrganizationEventVisibilityType)
  visibility?: OrganizationEventVisibilityType;

  @IsOptional()
  @IsArray()
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/events\/flyers\/|organizations\/[\w-]+\/events\/[\w-]+\/flyers\/)/,
    { each: true },
  )
  @AtLeastOneMediaOnUpdate()
  flyers?: string[];

  @IsOptional()
  @IsArray()
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/events\/trailers\/|organizations\/[\w-]+\/events\/[\w-]+\/trailers\/)/,
    { each: true },
  )
  trailers?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  location?: UpdateLocationDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrganizationEventTicketDto)
  tickets?: UpdateOrganizationEventTicketDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  styles?: string[];

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @MinDate(new Date())
  startAt?: Date;

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @MinDate(new Date())
  endAt?: Date;
}
