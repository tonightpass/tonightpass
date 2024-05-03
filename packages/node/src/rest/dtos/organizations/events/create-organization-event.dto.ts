import { CreateOrganizationEventTicketDto } from "./tickets";
import { Location, OrganizationEventType } from "../../../types";

export class CreateOrganizationEventDto {
  title: string;
  description: string;
  organization: string;
  type: OrganizationEventType;
  public: boolean;
  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: CreateOrganizationEventTicketDto[];
  styles: string[];
  startAt: Date;
  endAt: Date;
}
