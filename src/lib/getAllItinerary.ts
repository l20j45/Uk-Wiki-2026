import { db } from "@db/db";
import { itinerary } from "@db/schema";

import type { itineraryType } from "@shared/interfaces/dataDefinitions";

export const getAllItinerary = async (): Promise<itineraryType[]> => {
  return db.select().from(itinerary).orderBy(itinerary.eventDate, itinerary.eventTime);
};
