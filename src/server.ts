import express, { Request, Response, Errback } from "express";
import db from "./db";
import { blogsTable } from "./db/schema";
import { eq } from "drizzle-orm";
const app = express();
app.use(express.json());

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
