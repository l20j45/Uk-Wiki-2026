import { db } from "@db/db";
import { articles } from "@db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const findOneArticle = async (id:number)=> {
  return db.query.articles.findFirst({
  where: eq(articles.id, id),
})
};
