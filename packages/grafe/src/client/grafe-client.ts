import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { UsersAPI } from "../api";
import { NotificationsAPI } from "../api/notifications";
import { REST } from "../REST";

interface ClientOptions {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export class GrafeClient {
  private readonly rest: REST;

  public readonly users: UsersAPI;
  public readonly notifications: NotificationsAPI;

  constructor({ apolloClient }: ClientOptions) {
    this.rest = new REST(apolloClient);

    this.users = new UsersAPI(this.rest);
    this.notifications = new NotificationsAPI(this.rest);
  }
}
