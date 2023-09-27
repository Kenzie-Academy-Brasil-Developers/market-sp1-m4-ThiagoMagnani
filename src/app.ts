import express, { Router } from "express";
import { editProducts, createProduct, delProduct, readProducts, getProductById } from "./logic";
import { isProductValid, isProductValidName } from "./middlewares";

const productRouter = Router();
const app = express();
const PORT = 3000;

app.use("/products/", productRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

productRouter.use(express.json());

productRouter.get("/", readProducts);

productRouter.post("/", isProductValidName, createProduct);

productRouter.get("/:id", isProductValid, getProductById);

productRouter.patch("/:id", isProductValid, isProductValidName, editProducts);

productRouter.delete("/:id", isProductValid, delProduct);


