export type User = {
  id: string;
  identifier: UserIdentifier;
  password: string;
  identity: UserIdentity;
  tokens: UserToken[];
  addresses: UserAddress[];
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

export type UserAddress = {
  id: string;
  street: string;
  zipCode: string;
  city: string;
  country: string; // was missing
};

export type UserPreferences = undefined; // missing type

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