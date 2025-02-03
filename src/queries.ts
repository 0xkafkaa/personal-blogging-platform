export const queries = {
  // Enable the uuid-ossp extension
  enableUUIDExtension: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,

  // Create blogs table
  createBlogsTable: `
      CREATE TABLE IF NOT EXISTS blogs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP        
      );
    `,

  // Create tags table
  createTagsTable: `
      CREATE TABLE IF NOT EXISTS tags (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        tagName VARCHAR(50) UNIQUE NOT NULL 
      );
    `,

  // Create blog-tags relationship table
  createBlogTagsTable: `
      CREATE TABLE IF NOT EXISTS blog_tags (
        blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
        tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (blog_id, tag_id)
      );
    `,

  // Insert a blog and get the blog ID
  insertBlog: `
      INSERT INTO blogs (title, slug, content)
      VALUES ($1, $2, $3)
      RETURNING id;  -- This will return the ID of the newly created blog
    `,

  // Insert tags dynamically (handles any number of tags)
  insertTags: `
      INSERT INTO tags (tagName)
      VALUES
      ${Array(5)
        .fill(`($1), ($2), ($3)`)
        .join(", ")}  -- Adjust based on the maximum number of tags you expect
      ON CONFLICT (tagName) DO NOTHING; -- Avoid duplicates
    `,

  // Link the blog with tags dynamically (handles any number of tags)
  linkBlogTags: `
      INSERT INTO blog_tags (blog_id, tag_id)
      SELECT $1, id
      FROM tags
      WHERE tagName = ANY($2::text[]);  -- Array of tag names, even if it has one element
    `,
};
