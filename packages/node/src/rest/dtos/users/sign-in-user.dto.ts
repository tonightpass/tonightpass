import { IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
