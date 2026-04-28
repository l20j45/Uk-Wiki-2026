import { db } from "@db/db";
import { articles } from "@db/schema";

import type { articleType } from "@shared/interfaces/dataDefinitions";

export const insertArticle = async (values:articleType)=> {
const {
    title,
    slug,
    description,
    content,
    category,
    importance,
    isUrgent,
    image,
  } = values;

  return db.insert(articles).values({
    title: title || "",
    slug: slug || "",
    description: description || "",
    content: content || "",
    category: category || "General",
    importance: Number(importance) || 1,
    isUrgent: Number(isUrgent) || 0,
    image: image || "",
    pubDate: new Date().toLocaleDateString("es-MX"),
  });
};
