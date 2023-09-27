import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const isProductValid = (req: Request, res: Response, next: NextFunction) => {
    if (market.findIndex(prod => prod.id == req.params.id) == -1) {
        return res.status(404).json({ message: "Product not found." });
    }
    return next();
}

export const isProductValidName = (req: Request, res: Response, next: NextFunction) => {
    const nameProductValid = market.find(prod => prod.name === req.body.name);
    if (nameProductValid) {
        return res.status(409).json({ message: "Product already registered." });
    }
    return next();
}