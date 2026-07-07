import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";

import { UserDeletionReason } from "../../types";

export class DeleteUserDto {
  @IsEnum(UserDeletionReason)
  reason: UserDeletionReason;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}
