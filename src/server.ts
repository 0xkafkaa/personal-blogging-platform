import express, { Request, Response, Errback } from "express";
import { seed } from "drizzle-seed";
import db from "./db";
import { blogsTable, blogTagsTable, tagsTable } from "./db/schema";
import { sql } from "drizzle-orm";
const app = express();
app.use(express.json());

app.get("/", async function (req: Request, res: Response) {
  const result = await db
    .select({
      title: blogsTable.title,
      content: blogsTable.content,
      tags: sql<string>`STRING_AGG(${tagsTable.tag_name}, ', ')`,
    })
    .from(blogsTable)
    .leftJoin(blogTagsTable, sql`${blogsTable.id} = ${blogTagsTable.blog_id}`)
    .leftJoin(tagsTable, sql`${blogTagsTable.tag_id} = ${tagsTable.id}`)
    .groupBy(blogsTable.id);
  console.log(result);
  res.json(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
