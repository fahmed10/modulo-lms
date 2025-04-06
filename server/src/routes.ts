import { Router } from "express";
import Announcements from "../models/announcements";
import Courses from "../models/courses";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth";
import Users from "../models/users";

export const router = Router();

router.get("/announcements", authMiddleware(), async (req, res) => {
    res.json(await Announcements.find());
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
    res.json(await Courses.find());
});

router.get("/courses/:id", authMiddleware(), async (req, res) => {
    res.json(await Courses.findOne({ courseId: req.params.id }));
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });

    if (!user) {
        res.json({ error: "Incorrect username or password." });
        return;
    }

    res.json({ ...user, token: jwt.sign(user.toJSON(), process.env.JWT_SECRET!, { expiresIn: "5d" }) });
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