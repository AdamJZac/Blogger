import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { router } from "./routes/index.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/", router);
