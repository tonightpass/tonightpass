import type { Client } from "../../../../rest";

export const usersPostsViews = (client: Client) => ({
  record: async (username: string, postId: string) =>
    client.post("/users/@:username/posts/:postId/views", undefined, {
      username,
      postId,
    }),
});
