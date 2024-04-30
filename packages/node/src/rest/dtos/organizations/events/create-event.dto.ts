import { CreateTicketDto } from "./tickets";
import { EventStyle, EventType } from "../../../types";

export class CreateEventDto {
  slug: string;
  type: EventType;
  public: boolean;
  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: CreateTicketDto[];
  styles: EventStyle[];
  startAt: Date;
  endAt: Date;
}
