import { db } from "@db/db";
import { itinerary } from "@db/schema";
import { asc, eq } from "drizzle-orm";

import type { itineraryType } from "@shared/interfaces/dataDefinitions";

export const getAllItineraryToday = async (
  dateParam: string,
): Promise<itineraryType[]> => {
  return db
    .select()
    .from(itinerary)
    .where(eq(itinerary.eventDate, dateParam))
    .orderBy(asc(itinerary.eventTime));
};
