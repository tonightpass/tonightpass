import { IsString, Matches } from "class-validator";

import { REGEX } from "../../../constants";

export class AddParticipantDto {
  @IsString()
  @Matches(REGEX.USERNAME, {
    message: "user.username.format",
  })
  username: string;
}
