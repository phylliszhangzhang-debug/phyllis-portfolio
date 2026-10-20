import type { Pair, Photo } from "./types";

export type WalkingRoute = {
  id: string;
  title: Pair;
  description: Pair;
  photos: Photo[];
};

// Add only the owner's actual routes and original photographs when supplied.
export const walkingRoutes: WalkingRoute[] = [];
