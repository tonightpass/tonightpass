import { Client, ClientOptions } from "./rest";
import { health, users } from "./sdk";

export class TonightPass {
  public readonly client: Client;

  public readonly health;
  public readonly users;

  constructor(options: ClientOptions) {
    this.client = new Client(options);

    this.health = health(this.client);
    this.users = users(this.client);
  }
}
