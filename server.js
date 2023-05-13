import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then((c) => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
