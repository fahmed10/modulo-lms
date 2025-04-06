import { Request, Response, NextFunction } from "express";

export type Middleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
export type ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void | Promise<void>;

declare global {
    namespace Express {
        interface Request {
            context: {
                user: {
                    role: string
                }
            }
        }
    }
}