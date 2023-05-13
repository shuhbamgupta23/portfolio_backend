import express from "express";
import { userRouter } from "./routes/User.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

export const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/", userRouter);

app.use(express.static(path.resolve("../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../frontend/build/index.html"));
});
