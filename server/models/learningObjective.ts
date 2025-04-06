import mongoose from "mongoose";
import { req } from "./utils";
import { DataBlock } from "./dataBlock";

export interface LearningObjective {
    chapter: {number: number, name: string},
    id: number,
    title: string,
    description: string,
    dataBlocks: any[]
}

export const LearningObjective = new mongoose.Schema({
    chapter: req({number: Number, name: String}),
    id: req(Number),
    title: req(String),
    description: req(String),
    dataBlocks: req([DataBlock])
});