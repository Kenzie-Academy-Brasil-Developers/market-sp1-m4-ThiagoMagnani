import express, { Router } from "express";
import { editProducts, createProduct, delProduct, readProducts, getProductById } from "../logic";
import { isProductValid } from "../middlewares/isProductValid";
import { isProductValidName } from "../middlewares/isProductValidName";

export const productRouter = Router();

productRouter.use(express.json());

productRouter.get("/", readProducts);

productRouter.post("/", isProductValidName, createProduct);

productRouter.get("/:id", isProductValid, getProductById);

productRouter.patch("/:id", isProductValid, isProductValidName, editProducts);

productRouter.delete("/:id", isProductValid, delProduct);
