import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import { Pool } from "pg";
import { blogsTable, blogTagsTable, tagsTable } from "./schema";
import { faker } from "@faker-js/faker";
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  console.log("seeding started");
  for (let i = 0; i < 10; i++) {
    let content = faker.book.title();
    const blog = await db
      .insert(blogsTable)
      .values({
        title: content,
        slug: content.replace(" ", "_"),
        content: faker.lorem.sentences(),
      })
      .returning();
    const tags = await db
      .insert(tagsTable)
      .values({
        tag_name: faker.word.noun(),
      })
      .returning();
    const blogTags = await db.insert(blogTagsTable).values({
      blog_id: blog[0].id,
      tag_id: tags[0].id,
    });
  }
  console.log("seeding ended");
}

main()
  .then()
  .catch((err) => console.log(err));
