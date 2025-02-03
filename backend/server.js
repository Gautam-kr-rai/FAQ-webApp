import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectdb } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import faqRoutes from "./routes/faq.route.js";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname= path.resolve()

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/faq", faqRoutes);


if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/Frontend/dist")))

  app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
 });
}
app.listen(PORT, () => {
  connectdb();
  console.log(`server is running on http://localhost:${PORT}`);
});
