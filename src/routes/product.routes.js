import express from "express";
import { validate } from "../middlewares/validate.js";
import { productSchema } from "../validations/product.schema.js";
import { createProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", validate(productSchema), createProduct);
router.get("/", getProducts);

export default router;