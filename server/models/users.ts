import mongoose from "mongoose";
import { req } from "./utils";

const Users = mongoose.model("Users", new mongoose.Schema({
  firstName: req(String),
  lastName: req(String),
  email: req(String, true),
  password: req(String),
  role: req(String)
}));

export default Users;