import productRepository from "../repositories/product.repository.js";
import ApiError from "../utils/ApiError.js";

class ProductService {
  async create(data) {
    return productRepository.create(data);
  }

  async getAll(query) {
    const {
      search,
      minPrice,
      maxPrice,
      sort,
      tags,
      page = 1,
      limit = 10,
      includeDeleted
    } = query;

    let filter = {};

    if (!includeDeleted) {
      filter.deletedAt = null;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (tags) {
      filter.tags = { $in: tags.split(",") };
    }

    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(":");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    const products = await productRepository.find(filter, {
      sort: sortOption,
      skip,
      limit: Number(limit)
    });

    const total = await productRepository.count(filter);

    return { total, page: Number(page), products };
  }

  async delete(id) {
    const deleted = await productRepository.softDelete(id);
    if (!deleted) throw new ApiError("Product not found", "NOT_FOUND", 404);
  }
}

export default new ProductService();