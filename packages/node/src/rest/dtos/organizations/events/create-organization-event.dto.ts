import { CreateOrganizationEventTicketDto } from "./tickets";
import { OrganizationEventStyle, OrganizationEventType } from "../../../types";

export class CreateOrganizationEventDto {
  slug: string;
  type: OrganizationEventType;
  public: boolean;
  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: CreateOrganizationEventTicketDto[];
  styles: OrganizationEventStyle[];
  startAt: Date;
  endAt: Date;
}
