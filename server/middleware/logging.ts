import { Middleware } from "../types";
import { Response } from "express";

let response: any;

export const logging: Middleware = (req, res, next) => {
    logResponseFunctions(res, "json", "jsonp", "send", "sendFile", "sendStatus");

    console.log(">", req.method, req.path, req.body === undefined ? "" : req.body);
    next();
    console.log("<", res.statusCode, response === undefined ? "" : response);
    response = undefined;
}

function logResponseFunctions(res: Response, ...fns: (keyof Response)[]) {
    fns.forEach((fn: any) => {
        res[fn] = new Proxy(res[fn], {
            apply(target, thisArg, args) {
                response = args[0];
                thisArg.app = res.app;
                return target.bind(thisArg)(...args);
            }
        });
    });
}