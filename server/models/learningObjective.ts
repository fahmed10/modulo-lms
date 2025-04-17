import mongoose from "mongoose";
import { req } from "./utils";
import { DataBlock } from "./dataBlock";

export interface LearningObjective {
    id: number,
    title: string,
    description: string,
    dataBlocks: any[]
}

export const LearningObjective = new mongoose.Schema<LearningObjective>({
    id: req(Number),
    title: req(String),
    description: req(String),
    dataBlocks: req([DataBlock])
});