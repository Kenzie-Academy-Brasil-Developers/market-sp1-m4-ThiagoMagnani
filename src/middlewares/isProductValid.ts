import { NextFunction, Request, Response } from "express";
import { market } from "../database";

export const isProductValid = (req: Request, res: Response, next: NextFunction) => {
    const foundProduct = market.findIndex(prod => prod.id == req.params.id);
    if (foundProduct == -1) {
        return res.status(404).json({ message: "Product not found." });
    }
    return next();
}
