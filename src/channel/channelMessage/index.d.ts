import { User } from "../../user";
import { Channel } from "../../channel";

export type channelMessage = {
  id: string;
  channel: Channel;
  sender: User;
  content: string;
  sent: boolean;
  attachements: Attachement[];
  updatedAt: string;
  createdAt: string;
  reaction: Reaction[]; //Just like discord, emoji reactions
};

export type Attachement = {
  type: string;
  url: string;
};

export type Reaction = {
  emojiCode: string; 
  amount: number    //number of user used that particular emoji
};
