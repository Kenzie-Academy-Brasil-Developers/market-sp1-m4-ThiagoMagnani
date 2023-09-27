import { Request, Response } from "express";
import { market } from "./database";

let idCount = 1;
let actualDate = new Date();
const expirationDate = new Date(actualDate);
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
    const index = market.findIndex(prod => prod.id == req.params.id);
    const valueOriginal = market[index];
    const editProd = { ...valueOriginal, ...req.body };
    market.splice(index, 1, editProd);
    return res.status(200).json(editProd);
}

export const delProduct = (req: Request, res: Response) => {
    const index = market.findIndex(prod => prod.id == req.params.id);
    market.splice(index, 1);
    return res.status(204).json({ message: "Product not found." });
}
