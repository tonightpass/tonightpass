import { Address } from "..";
import { Organization } from "../organization";
import { EventTicket } from "./ticket";


export type Event = {
  title: string;
  description: string;
  slug: string;
  organization: Organization;
  type: EventType;
  public: boolean;
  flyers: string[];
  trailers: string[];
  location: Address;
  tickets: EventTicket[];
  startAt: Date;
  endAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

export enum EventType {
  "clubbing",
  "concert",
  "afterwork",
  "dancing_lunch",
  "diner",
  "garden",
  "after_beach",
  "festival",
  "spectacle",
  "cruise",
  "outside_animation",
  "sport",
  "match",
  "seminar",
  "conference",
  "wellness_day",
  "workshop",
  "trade_fair",
  "consumer_show",
  "membership"
}