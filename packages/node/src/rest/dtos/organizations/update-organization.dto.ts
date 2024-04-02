import { IsNotEmpty, IsObject, IsString } from "class-validator";

import { CreateOrganizationDto } from "./create-organization.dto";
import { Location } from "../../types";

export class UpdateOrganizationDto
  implements Pick<CreateOrganizationDto, "name" | "location">
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  location?: Location;
}
