import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { logging } from "../middleware/logging";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logging);

app.use("/api", router);

await mongoose.connect(process.env.MONGO_DB_URI!);

// await Courses.deleteMany();
// await new Courses({
//     title: "Chemistry 1212K", courseId: "chem-1212k", learningObjectives: [
//         {
//             chapter: { number: 12, name: "Kinetics" },
//             id: 1,
//             title: "Using Relative Rate Laws",
//             description: "Learn to interpret and write relative rate laws for chemical reactions.",
//             dataBlocks: [
//                 { block: "text", type: "header", value: "Writing Relative Rate Laws" },
//                 {
//                     block: "text", type: "body", value: `Relative rate laws allow us to write the rate of a reaction in terms of the rate of change of the concentrations of its reactants and products.
//                 For example, the following chemical equation shows the reaction of elemental magnesium with oxygen gas to form magnesium oxide:`},
//                 { block: "text", type: "chem", value: "2 Mg + O2 -> 2 MgO" },
//                 {
//                     block: "exercise", exercise: "math", title: "Relative Rate Laws of Reactions", body: [
//                         { block: "text", type: "body", value: "Write the relative rate law of this reaction: " },
//                         { block: "text", type: "chem-inline", value: "2 Ba + O2 -> 2 BaO" }
//                     ], prefix: "\\text{rate}=\\text{ }", answers: ["-(1)/(2)*(Delta[Ba])/(Deltat)=-(Delta[O_2])/(Deltat)=(1)/(2)*(Delta[BaO])/(Deltat)"]
//                 }
//             ]
//         }
//     ]
// }).save();
// console.log((await Courses.find())[0].learningObjectives[0].dataBlocks);

const port = process.env.PORT ?? "5000";
app.listen(port, () => {
    console.log(`Started server at http://localhost:${port}.`);
});