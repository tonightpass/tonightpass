import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ArrayMinSize,
  ArrayMaxSize,
  IsUUID,
  ValidateIf,
} from "class-validator";

import { ChannelType } from "../../types";

export class CreateChannelDto {
  @IsEnum(ChannelType)
  type: ChannelType;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateIf((o) => o.type === ChannelType.Private)
  @ArrayMaxSize(2, { message: "Private channels can only have 2 users" })
  @ValidateIf((o) => o.type === ChannelType.Group)
  @ArrayMinSize(3, { message: "Group channels must have at least 3 users" })
  @ArrayMaxSize(50, { message: "Group channels can have at most 50 users" })
  @IsUUID("4", { each: true })
  userIds: string[];

  @IsOptional()
  @ValidateIf((o) => o.type === ChannelType.Group)
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @ValidateIf((o) => o.type === ChannelType.Group)
  @IsString()
  @Length(1, 500)
  description?: string;
}
