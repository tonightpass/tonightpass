import { Location } from "..";
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
  location: Location;
  tickets: EventTicket[];
  styles: EventStyle[];
  startAt: Date;
  endAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

export enum EventType {
  Clubbing = "clubbing",
  Concert = "concert",
  Afterwork = "afterwork",
  DancingLunch = "dancing_lunch",
  Diner = "diner",
  Garden = "garden",
  AfterBeach = "after_beach",
  Festival = "festival",
  Spectacle = "spectacle",
  Cruise = "cruise",
  OutsideAnimation = "outside_animation",
  Sport = "sport",
  Match = "match",
  Seminar = "seminar",
  Conference = "conference",
  WellnessDay = "wellness_day",
  Workshop = "workshop",
  TradeFair = "trade_fair",
  ConsumerShow = "consumer_show",
  Membership = "membership",
}

export type EventStyle = {
  type: EventStyleType;
  emoji: string;
  name: string;
};

export enum EventStyleType {
  Music = "music",
  Dress = "dress",
  Sport = "sport",
  Food = "food",
  Art = "art",
}
