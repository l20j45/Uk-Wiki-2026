import { db } from "@db/db";
import { articles } from "@db/schema";

import type { articleType } from "@shared/interfaces/dataDefinitions";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const updateArticle = async (newValues: articleType) => {
const {
  title,
  description,
  pubDate,
  category,
  importance,
  image,
  isUrgent,
  content,
} = newValues;

const existingArticle = await db.query.articles.findFirst({
  where: eq(articles.slug, newValues.slug ?? ""),
});
if (!existingArticle || existingArticle.id === newValues.id) {

return await db
  .update(articles)
  .set({
    title,
    description: description ?? "",
    pubDate,
    category,
    importance: Number(importance) || 1,
    image,
    isUrgent: Number(isUrgent) || 0,
    content: content ?? ""
  })
  .where(eq(articles.id, newValues.id!))
  .returning({ id: articles.id });
}};
