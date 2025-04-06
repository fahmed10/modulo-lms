import mongoose from "mongoose";
import { req } from "./utils";
import { LearningObjective } from "./learningObjective";

const Courses = mongoose.model("Courses", new mongoose.Schema({
  title: req(String),
  courseId: req(String, true),
  learningObjectives: req([LearningObjective])
}));

export default Courses;