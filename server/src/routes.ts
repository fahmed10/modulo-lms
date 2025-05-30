import { Router } from "express";
import Announcements from "../models/announcements";
import Courses from "../models/courses";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth";
import Users from "../models/users";
import { LearningObjective } from "../models/learningObjective";
import { Chapter } from "../models/chapter";

export const router = Router();

router.get("/announcements", authMiddleware(), async (req, res) => {
    res.json(await Announcements.find({ for: req.context.user.role }));
});

router.put("/announcements", authMiddleware("admin"), async (req, res) => {
    res.json(await Announcements.create({ ...req.body, time: Date() }));
});

router.patch("/announcements/:id", authMiddleware("admin"), async (req, res) => {
    res.json(await Announcements.findByIdAndUpdate(req.params.id, req.body));
});

router.delete("/announcements/:id", authMiddleware("admin"), async (req, res) => {
    res.json(await Announcements.findByIdAndDelete(req.params.id));
});

router.get("/courses", authMiddleware(), async (req, res) => {
    res.json(await Courses.find().select("-chapters"));
});

router.get("/courses/:id", authMiddleware(), async (req, res) => {
    res.json(await Courses.findOne({ code: req.params.id }));
});

router.get("/courses/:cId/modules/:oId/exercises", authMiddleware(), async (req, res) => {
    const { cId, oId } = req.params;
    const course = (await Courses.findOne({ courseId: cId }))!;
    const objective = (course.chapters as any as any[]).find((c: Chapter) => c.number.toString() === oId.split('.')[0])
        .learningObjectives.find((o: LearningObjective) => o.id.toString() === oId.split('.')[1]);
    const exercises: string[] = [];

    objective.dataBlocks.forEach(dataBlock => {
        if (dataBlock.block === "exercise") {
            exercises.push((dataBlock.completedBy?.includes(req.context.user._id) ?? false) ? "correct" : "unanswered");
        }
    });

    res.json(exercises);
});

router.post("/courses/:cId/modules/:oId/exercises/:eId/answer", authMiddleware(), async (req, res) => {
    const { cId, oId, eId } = req.params;
    const { answer } = req.body;
    const course = (await Courses.findOne({ courseId: cId }))!;
    const objective = (course.chapters as any as any[]).find((c: Chapter) => c.number.toString() === oId.split('.')[0])
        .learningObjectives.find((o: LearningObjective) => o.id.toString() === oId.split('.')[1]);

    const dataBlock = objective.dataBlocks.filter(d => d.block === "exercise")[Number(eId) - 1];
    if (dataBlock.answers.includes(answer)) {
        dataBlock.completedBy ??= [];
        dataBlock.completedBy.push(req.context.user._id);
    } else {
        res.json({ correct: false })
        return;
    }

    await course.save();
    res.json({ correct: true });
});

router.patch("/courses/:cId", authMiddleware("faculty"), async (req, res) => {
    res.json(await Courses.findOneAndUpdate({ code: req.params.cId }, req.body));
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PWD && email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PWD) {
        const admin = { email: process.env.ADMIN_EMAIL, firstName: "Admin", lastName: "Admin", role: "admin" };
        res.json({ ...admin, token: jwt.sign(admin, process.env.JWT_SECRET!, { expiresIn: "1d" }) });
        return;
    }

    const user = await Users.findOne({ email, password });

    if (!user) {
        res.json({ error: "Incorrect email or password." });
        return;
    }

    res.json({ ...user.toJSON(), token: jwt.sign(user.toJSON(), process.env.JWT_SECRET!, { expiresIn: "5d" }) });
});

router.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        res.json({ error: "Email, password, first name, and last name are required." });
        return;
    }

    if (password.length < 8) {
        res.json({ error: "Password must be at least 8 letters long." });
        return;
    }

    try {
        await Users.create({ email, password, firstName, lastName, role: "student" });
    } catch (error) {
        if (error?.code === 11000 && "email" in error.errorResponse.keyPattern) {
            res.json({ error: "Email already in use. Try logging in." });
            return;
        }
    }

    res.sendStatus(200);
});

router.get("/users", authMiddleware("admin"), async (req, res) => {
    res.json(await Users.find().select("-password"));
})

router.put("/users", authMiddleware("admin"), async (req, res) => {
    const { email, password, firstName, lastName, role = "student" } = req.body;

    if (!email || !password || !firstName || !lastName) {
        res.json({ error: "Email, password, first name, and last name are required." });
        return;
    }

    try {
        res.json(await Users.create({ firstName, lastName, email, password, role }));
    } catch (error) {
        if (error?.code === 11000 && "email" in error.errorResponse.keyPattern) {
            res.json({ error: "Email already in use. Try logging in." });
            return;
        }
    }
});

router.delete("/users/:id", authMiddleware("admin"), async (req, res) => {
    res.json(await Users.findByIdAndDelete(req.params.id));
});