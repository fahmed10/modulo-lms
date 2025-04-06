import jwt from 'jsonwebtoken';
import { Middleware } from '../types';
import { Response } from 'express';

type Role = "student" | "faculty" | "admin";

function failAuthentication(res: Response) {
    res.status(403).json({ errorType: "unauth" });
    res.end();
}

const authMiddleware: (...roles: Role[]) => Middleware = (...roles) => async (req, res, next) => {
    if (roles.length === 0) {
        roles = ["student", "faculty", "admin"];
    }

    const token = req.headers.authorization?.split(" ", 2)?.[1];

    if (!token) {
        failAuthentication(res);
        return;
    }

    try {
        let tokenData = jwt.verify(token, process.env.JWT_SECRET!) as { role: Role };

        if (!roles.includes(tokenData.role)) {
            failAuthentication(res);
            return;
        }

        req.context = { user: tokenData };
    } catch (e) {
        console.error(e);
        failAuthentication(res);
        return;
    }

    next();
}

export default authMiddleware;