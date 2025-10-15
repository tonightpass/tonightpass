import { IsNotEmpty, IsString } from "class-validator";

export class GoogleOneTapDto {
  @IsNotEmpty()
  @IsString()
  credential: string;
}
