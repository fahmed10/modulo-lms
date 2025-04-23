import mongoose from "mongoose";
import { req } from "./utils";
import { LearningObjective } from "./learningObjective";

export interface Chapter {
    number: number,
    name: string,
    learningObjectives: LearningObjective[]
}

export const Chapter = new mongoose.Schema<Chapter>({
    number: req(Number),
    name: req(String),
    learningObjectives: req([LearningObjective])
});