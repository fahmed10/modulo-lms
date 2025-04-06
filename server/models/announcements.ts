import mongoose from "mongoose";
import { req } from "./utils";

const Announcements = mongoose.model("Announcements", new mongoose.Schema({
  title: req(String),
  body: req(String),
  for: req(String)
}));

export default Announcements;