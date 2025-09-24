import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateIf,
  Matches,
} from "class-validator";

import { REGEX } from "../../../constants";
import { ChannelType } from "../../types";

export class CreateChannelDto {
  @IsEnum(ChannelType)
  type: ChannelType;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateIf((o) => o.type === ChannelType.Private)
  @ArrayMaxSize(2, { message: "Private channels can only have 2 participants" })
  @ValidateIf((o) => o.type === ChannelType.Group)
  @ArrayMinSize(3, {
    message: "Group channels must have at least 3 participants",
  })
  @ArrayMaxSize(50, {
    message: "Group channels can have at most 50 participants",
  })
  @IsString({ each: true })
  @Matches(REGEX.USERNAME, { 
    each: true, 
    message: "user.username.format" 
  })
  participantUsernames: string[];

  @IsOptional()
  @ValidateIf((o) => o.type === ChannelType.Group)
  @IsString()
  @Length(1, 100)
  name?: string;
}
