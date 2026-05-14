import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

import type { EventArtistRef } from "../../../types";

export class EventArtistDto implements EventArtistRef {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: "artist.id.numeric" })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: "artist.permalink.format" })
  permalink: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  username: string;
}
