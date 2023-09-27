import { NextFunction, Request, Response } from "express";
import { market } from "../database";

export const isProductValidName = (req: Request, res: Response, next: NextFunction) => {
    const nameProductValid = market.find(prod => prod.name === req.body.name);
    if (nameProductValid) {
        return res.status(409).json({ message: "Product already registered." });
    }
    return next();
}