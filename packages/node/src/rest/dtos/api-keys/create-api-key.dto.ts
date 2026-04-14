import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

import { ApiKeyTier, ApiKeyType } from "../../types/api-keys";

export class CreateApiKeyDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsEnum(ApiKeyType)
  @IsOptional()
  type?: ApiKeyType;

  @IsEnum(ApiKeyTier)
  @IsOptional()
  tier?: ApiKeyTier;

  @IsArray()
  @IsUrl(
    { require_protocol: true, require_tld: false },
    { each: true, message: "Each allowed origin must be a valid URL" }
  )
  @ArrayMaxSize(20)
  @IsOptional()
  allowedOrigins?: string[];
}
