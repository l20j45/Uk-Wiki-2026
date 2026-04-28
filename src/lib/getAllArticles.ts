import { db } from "@db/db";
import { articles } from "@db/schema";
import { asc } from "drizzle-orm";

import type { articleType } from "@shared/interfaces/dataDefinitions";

export const getAllArticles = async (): Promise<articleType[]> => {
  return db.select().from(articles).orderBy(asc(articles.id));
};
