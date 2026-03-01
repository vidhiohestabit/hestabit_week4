import Product from "../models/Product.js";

class ProductRepository {
  async create(data) {
    return Product.create(data);
  }

  async find(filter, options) {
    const { sort, skip, limit } = options;

    return Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  async count(filter) {
    return Product.countDocuments(filter);
  }

  async softDelete(id) {
    return Product.findByIdAndUpdate(id, {
      deletedAt: new Date()
    });
  }
}

export default new ProductRepository();