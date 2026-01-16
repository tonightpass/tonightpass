import type { OrganizationEventStyleType } from "../../../../types";

export class CreateOrganizationEventStyleDto {
  type: OrganizationEventStyleType;
  emoji: string;
  name: string;
}
