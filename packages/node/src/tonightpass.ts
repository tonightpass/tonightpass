import { Client, ClientOptions } from "./rest";
import { careers } from "./sdk/careers";
import { health } from "./sdk/health";
import { profiles } from "./sdk/profiles";
import { users } from "./sdk/users";

export class TonightPass {
  public readonly client: Client;

  public readonly careers;
  public readonly health;
  public readonly profiles;
  public readonly users;

  constructor(options: ClientOptions) {
    this.client = new Client(options);

    this.careers = careers(this.client);
    this.health = health(this.client);
    this.profiles = profiles(this.client);
    this.users = users(this.client);
  }
}
