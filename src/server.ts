import express, { Request, Response, Errback } from "express";
import pool from "./database";
import { queries } from "./queries";

const app = express();
app.use(express.json());

// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;

//   try {
//     const result = await pool.query(queries.insertUser, [name, email]);
//     res.json(result.rows[0]);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(queries.getAllUsers);
//     res.json(result.rows);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
