CREATE TABLE "blog-tags" (
	"blog_id" uuid,
	"tag_id" uuid,
	CONSTRAINT "blog-tags_blog_id_tag_id_pk" PRIMARY KEY("blog_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tag_name" varchar(255) NOT NULL,
	CONSTRAINT "tags_tag_name_unique" UNIQUE("tag_name")
);
--> statement-breakpoint
ALTER TABLE "blog-tags" ADD CONSTRAINT "blog-tags_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog-tags" ADD CONSTRAINT "blog-tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;