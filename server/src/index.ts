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



const port = process.env.PORT ?? "5000";
app.listen(port, () => {
    console.log(`Started server at http://localhost:${port}.`);
});