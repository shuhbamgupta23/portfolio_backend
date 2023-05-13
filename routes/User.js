import express from "express";
import {
  login,
  logout,
  getUser,
  myProfile,
  contact,
  updateUser,
  addTimeline,
  addProject,
  deleteTimeline,
  deleteProject,
} from "../controller/User.js";
import { isAuthenticated } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/user", getUser);
userRouter.get("/me", isAuthenticated, myProfile);

userRouter.put("/admin/update", isAuthenticated, updateUser);
userRouter.post("/admin/timeline/add", isAuthenticated, addTimeline);
userRouter.post("/admin/project/add", isAuthenticated, addProject);
userRouter.delete("/admin/timeline/:id", isAuthenticated, deleteTimeline);
userRouter.delete("/admin/project/:id", isAuthenticated, deleteProject);

userRouter.post("/contact", contact);
