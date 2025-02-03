import pool from "./database";
import { queries } from "./queries";
async function initializeDatabase() {
  try {
    await pool.query(queries.enableUUIDExtension);
    await pool.query(queries.createBlogsTable);
    console.log("Blogs table created or already exists.");
    await pool.query(queries.createTagsTable);
    console.log("Tags table created or already exists.");
    await pool.query(queries.createBlogTagsTable);
    console.log("Blog linking tags table created or already exists");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

export default initializeDatabase;
