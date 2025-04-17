import mongoose from "mongoose";
import { req } from "./utils";
import { Chapter } from "./chapter";

const Courses = mongoose.model("Courses", new mongoose.Schema({
  title: req(String),
  code: req(String, true),
  codeLong: req(String, true),
  chapters: req([Chapter])
}));

export default Courses;