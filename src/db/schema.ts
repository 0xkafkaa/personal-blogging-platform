import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const blogsTable = pgTable("blogs", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique().notNull(),
  content: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const tagsTable = pgTable("tags", {
  id: uuid().defaultRandom().primaryKey(),
  tag_name: varchar({ length: 255 }).unique().notNull(),
});

export const blogTagsTable = pgTable(
  "blog-tags",
  {
    blog_id: uuid().references(() => blogsTable.id, { onDelete: "cascade" }),
    tag_id: uuid().references(() => tagsTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.blog_id, table.tag_id] })]
);
