import { sdk } from "../../builder";

export const usersNotifications = sdk((client) => ({
  me: async () => client.get("/users/~me/notifications"),
  count: async (options: { unseen?: boolean }) =>
    client.get("/users/~me/notifications/count", options),
  read: async () => client.put("/users/~me/notifications/read", undefined),
}));
