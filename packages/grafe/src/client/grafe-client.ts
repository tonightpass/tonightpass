import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { REST } from "../REST";
import { UsersAPI } from "../api";
import { AuthAPI } from "../api/auth";
import { NotificationsAPI } from "../api/notifications";

interface ClientOptions {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export class GrafeClient {
  private readonly rest: REST;

  public readonly users: UsersAPI;
  public readonly auth: AuthAPI;
  public readonly notifications: NotificationsAPI;

  constructor({ apolloClient }: ClientOptions) {
    this.rest = new REST(apolloClient);

    this.users = new UsersAPI(this.rest);
    this.auth = new AuthAPI(this.rest);
    this.notifications = new NotificationsAPI(this.rest);
  }
}
