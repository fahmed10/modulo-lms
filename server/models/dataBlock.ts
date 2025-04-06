import mongoose from "mongoose";
import { req } from "./utils";

interface DataBlock {}

export const DataBlock = new mongoose.Schema({block: req(String), type: String, value: String, exercise: String, completedBy: [String], title: String, prefix: String, answers: [String], body: [{block: req(String), type: req(String), value: req(String)}]});

interface TextBlock extends DataBlock {
    block: "text",
    type: "body" | "header" | "chem" | "math" | "chem-inline" | "math-inline",
    value: string
}

interface Exercise extends DataBlock {
    block: "exercise",
    title: string,
    body: DataBlock[]
}

interface MathExercise extends Exercise {
    exercise: "math",
    prefix: string,
    answers: string[]
}