import productService from "../services/product.service.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.create(req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.getAll(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.delete(req.params.id);
    res.json({ success: true, message: "Product soft deleted" });
  } catch (err) {
    next(err);
  }
};