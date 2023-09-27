import { Request, Response } from "express";
import { market } from "./database";

let idCount = 1;
const expirationDate = new Date(new Date());
expirationDate.setFullYear(expirationDate.getFullYear() + 1);

export const readProducts = (req: Request, res: Response) => {
    return res.status(200).json({ total: market.reduce((acumulador, item) => acumulador + item.price, 0), products: market });
}

export const createProduct = (req: Request, res: Response) => {
    const id = idCount++;
    const newProduct = { id, ...req.body, expirationDate: expirationDate };
    market.push(newProduct);
    return res.status(201).json(newProduct);
};

export const getProductById = (req: Request, res: Response) => {
    const searchProduct = market.find(prod => prod.id == req.params.id);
    return res.status(200).json(searchProduct);
}

export const editProducts = (req: Request, res: Response) => {
    const valueOriginal = market[(market.findIndex(prod => prod.id == req.params.id))];
    market.splice(market.findIndex(prod => prod.id == req.params.id), 1, { ...valueOriginal, ...req.body });
    return res.status(200).json({ ...valueOriginal, ...req.body });
}

export const delProduct = (req: Request, res: Response) => {
    market.splice(market.findIndex(prod => prod.id == req.params.id), 1);
    return res.status(204).json({ message: "Product not found." });
}