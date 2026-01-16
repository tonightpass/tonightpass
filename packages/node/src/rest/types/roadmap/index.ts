import type { Endpoint } from "../../endpoints";

export const ROADMAP_REACTIONS = ["👍", "❤️", "🎉", "👀", "🚀"] as const;

export type RoadmapReaction = (typeof ROADMAP_REACTIONS)[number];

export type RoadmapReactionCounts = {
  [K in RoadmapReaction]?: number;
};

export enum RoadmapFeatureStatus {
  ComingSoon = "coming-soon",
  Shipped = "shipped",
}

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  status: RoadmapFeatureStatus;
  date?: string;
}

export interface AddRoadmapReactionBody {
  featureId: string;
  reaction: RoadmapReaction;
}

export type RoadmapEndpoints =
  | Endpoint<
      "GET",
      "/roadmap/reactions/:featureId",
      RoadmapReactionCounts,
      { featureId: string }
    >
  | Endpoint<
      "POST",
      "/roadmap/reactions/:featureId",
      RoadmapReactionCounts,
      AddRoadmapReactionBody
    >;
