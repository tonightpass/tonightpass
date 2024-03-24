import { Client } from "../rest";

export function sdk<T>(builder: (client: Client) => T) {
  return builder;
}
