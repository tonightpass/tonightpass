// User
export type User = {
  id: string;
  identifier: UserIdentifier;
  password: string;
  identity: UserIdentity;
  tokens: UserToken[];
  addresses: Address[];
  preferences: UserPreferences;
  connections: UserConnection[];
  updatedAt: Date;
  createdAt: Date;
};

export type UserIdentifier = {
  [key: string]: string;
};

export type UserIdentity = {
  firstName: string;
  lastName: string;
  userName: string;
  gender: UserIdentityGender;
  profilePictureUrl?: string;
  birthDate: Date;
  // idValid: boolean;
};

export type UserIdentityGender = "male" | "female" | "unknow" | string;

export type UserToken = {
  id: string;
  type: UserTokenType;
  value: string;
  createdAt: Date;
  expiresAt: Date;
}

export type UserTokenType = "recovery" | "email" | "phone";

export type UserPreferences = unknown; // missing type

export type UserConnection = {
  ip: string;
  os: UserConnectionOS;
  device: UserConnectionDevice;
  client: UserConnectionClient;
  updatedAt: Date;
  createdAt: Date;
};

export type UserConnectionOS = {
  name: string;
  version: string;
};

export type UserConnectionDevice = {
  type: string;
  brand: string;
};

export type UserConnectionClient = {
  name: string;
  version: string;
};

// Organization
export type Organization = {
  id: string;
  name: string;
  socials: OrganizationSocial[];
  members: OrganizationMember[];
  adress: Address;
  tickets: EventTicket[];
  events: Event[];
  updatedAt: Date;
  createdAt: Date;
};

export type OrganizationSocial = {
  type: OrganizationSocialType;
  url: string;
};

export type OrganizationSocialType = "facebook" | "twitter" | "instagram" | "linkedin" | "youtube" | "website" | string;

export type OrganizationMember = {
  email: string;
  role: OrganizationMemberRole;
};

export type OrganizationMemberRole = unknown; // missing type

// Event
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

export type EventTicket = {
  id: string;
  title: string;
  price: number;
  fee: boolean;
  quantity: number;
  startAt: Date;
  endAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

// Address
export type Address = {
  id: string;
  street: string;
  zipCode: string;
  city: string;
  country: string; // was missing
};
