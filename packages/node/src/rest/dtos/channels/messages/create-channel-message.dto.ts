import {
  IsArray,
  IsOptional,
  IsString,
  Length,
  ArrayMaxSize,
  IsMongoId,
  Matches,
} from "class-validator";

export class CreateChannelMessageDto {
  @IsOptional()
  @IsString()
  @Length(1, 4000)
  content?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @Matches(/^channels\/[\w-]+\/messages\/[\w-]+\/private\/[\w-]+$/, {
    each: true,
  })
  attachments?: string[];

  @IsOptional()
  @IsMongoId()
  replyToId?: string;
}
