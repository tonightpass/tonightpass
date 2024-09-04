import { Client, ClientOptions } from "./rest";
import {
  auth,
  careers,
  health,
  notifications,
  orders,
  organizations,
  profiles,
  users,
} from "./sdk";

export class TonightPass {
  public readonly client: Client;

  public readonly auth;
  public readonly careers;
  public readonly health;
  public readonly orders;
  public readonly organizations;
  public readonly profiles;
  public readonly users;
  public readonly notifications;

  constructor(options: ClientOptions) {
    this.client = new Client(options);

    this.auth = auth(this.client);
    this.careers = careers(this.client);
    this.health = health(this.client);
    this.orders = orders(this.client);
    this.organizations = organizations(this.client);
    this.profiles = profiles(this.client);
    this.users = users(this.client);
    this.notifications = notifications(this.client);
  }
}
