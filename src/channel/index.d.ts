import { User } from "../user";

export type Channel = {
  id?: string;
  type?: "private" | "group";
  user: User[];
  createdOn?: Date;
  muteChannel: Duration; //mute Channel which will accept number from enum (duration)
  inviteLink: string;  //Channel invite link
};

export enum Duration{
  fifteenMinute = 0.25,
  oneHour = 60,
  threeHour = 180,
  eightHour = 480,
  twentyFourHour = 1440,
  manualTurnOn = 1,
  manualTurnOff = 0
}
