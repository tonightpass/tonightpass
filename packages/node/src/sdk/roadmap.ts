import type { RoadmapReaction } from "../rest/types";
import { sdk } from "./builder";

export const roadmap = sdk((client) => ({
  reactions: {
    get: async (featureId: string) =>
      client.get("/roadmap/reactions/:featureId", { featureId }),
    add: async (featureId: string, reaction: RoadmapReaction) =>
      client.post("/roadmap/reactions/:featureId", { featureId, reaction }),
  },
}));
