import { Currency, Language, Location } from "..";

export type User = {
  id: string;
  identifier: UserIdentifier;
  password: string;
  identity: UserIdentity;
  addresses: Location[];
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
  idValid: boolean;
};

export type UserIdentityGender = "male" | "female" | "non-binary" | string;

export type UserPreferences = {
  language: Language;
  currency: Currency;
  notifications: {
    email: {
      newsletter: boolean;
      message: boolean;
    };
    push: {
      message: boolean;
    };
  };
};

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
