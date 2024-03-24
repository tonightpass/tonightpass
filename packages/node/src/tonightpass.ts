import { Client } from "./rest";
import { health, users } from "./sdk";

export class TonightPass {
  public readonly client: Client;

  public readonly health;
  public readonly users;

  constructor() {
    this.health = health(this.client);
    this.users = users(this.client);
  }
}
