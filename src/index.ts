import express, { Request, Response } from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// blog api
app.use("/api", blogRoutes);

app.get("/", (request: Request, respones: Response) => {
  respones.status(200).send("hi");
  return;
});

app.listen(PORT, () => console.log(`listing in port ${PORT}`));
