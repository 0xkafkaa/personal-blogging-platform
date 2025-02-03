import express, { Request, Response, Errback } from "express";
import pool from "./database";
import { queries } from "./queries";
import initializeDatabase from "./initDB";
import { Query } from "pg";
const app = express();
app.use(express.json());
initializeDatabase();

app.post("/api/blog", async (req: Request, res: Response): Promise<any> => {
  const { title, slug, content, tags } = req.body;

  // Basic input validation (you can expand on this as needed)
  if (!title || !slug || !content) {
    return res.status(400).json({ error: "Missing required blog fields" });
  }
  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({ error: "Tags must be an array of strings" });
  }

  const client = await pool.connect();

  try {
    // Start a transaction
    await client.query("BEGIN");

    // 1. Insert the blog and retrieve its id
    const blogResult = await client.query(queries.insertBlog, [
      title,
      slug,
      content,
    ]);
    const blogId = blogResult.rows[0].id;

    // 2. If tags are provided, insert them (ignoring duplicates)
    if (tags && tags.length > 0) {
      // Insert tags using a dynamic query that unpacks an array
      const insertTagsQuery = `
        INSERT INTO tags (tagName)
        SELECT unnest($1::text[])
        ON CONFLICT (tagName) DO NOTHING;
      `;
      await client.query(insertTagsQuery, [tags]);

      // 3. Link the blog to its tags
      // The provided query uses ANY() to match tag names from the passed array.
      await client.query(queries.linkBlogTags, [blogId, tags]);
    }

    // Commit the transaction
    await client.query("COMMIT");

    return res.status(201).json({
      message: "Blog created successfully",
      blogId,
    });
  } catch (error) {
    // Roll back the transaction in case of error
    await client.query("ROLLBACK");
    console.error("Error creating blog post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Release the client back to the pool
    client.release();
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
