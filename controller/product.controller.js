const Product = require("../models/produit");
const Category = require("../models/category");
const Subcategory = require("../models/sub_category");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const productsByCategorySubName = await Subcategory.findOne({
      _id: req.body.sub_categories,
    });

    const productsByCategoryName = await Category.findOne({
      _id: productsByCategorySubName.category,
    });
    if (!productsByCategoryName)
      return res.status(404).json({ error: "no category for this profile" });

    product.categories = productsByCategoryName._id;
    await product.save();

    productsByCategoryName.id_prod.push(product._id);
    productsByCategorySubName.id_prod.push(product._id);
    await productsByCategorySubName.save();
    await productsByCategoryName.save();
    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to create product" });
  }
};
const gegtImagesNames = async (req, res) => {
  try {
    return res.status(201).json(req.file);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, limit = 0 } = req.query;

    // If no category is provided, return error
    if (!category) {
      return res.status(400).json({ error: "Category parameter is required" });
    }

    // Query the database for products based on category
    const products = await Product.find({
      removed: false,
      enabled: true,
    })
      .limit(limit)
      .populate("productCategory");
    let arr = products.filter(
      (x) => category === "all" || x.productCategory.type == category
    );

    return res.json(arr);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

const getAllProductsCat = async (req, res) => {
  try {
    const { price, category, name } = req.query;

    const filter = {};

    if (price) {
      filter["price"] = { $lte: parseInt(price) };
    }
    // Add category filter if provided
    if (name) {
      filter["productCategory.type"] = name;
    }

    const names = category.split(",");

    const products = await Product.find({
      price: { $lte: parseInt(price) },
      removed: false,
      enabled: true,
    });

    let arr = products.filter((x) => x.productCategory.type == name);
    console.log(arr, names);
    if (names.length > 0) {
      const newArr = [];

      arr.map((x) => {
        names.map((y) => {
          if (y == x.productCategory.name) newArr.push(x);
        });
      });
      return res.json(newArr);
    } else {
      return res.json(arr);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

const getAllProductsSub = async (req, res) => {
  try {
    // Aggregation pipeline to get 12 random products
    const products = await Product.aggregate([
      { $sample: { size: 12 } }, // Randomly sample 12 documents
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      }, // Populate categories
      {
        $lookup: {
          from: "sub_categories",
          localField: "sub_categories",
          foreignField: "_id",
          as: "sub_categories",
        },
      }, // Populate sub_categories
    ]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.query;

  try {
    const product = await Product.findOne({ name });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndRemove(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

const searchProducts = async (req, res) => {
  const { title, category, subcategory } = req.query;
  try {
    const query = {};
    console.log(title != "null");
    if (title) {
      query.title = title != "null" ? { $regex: title, $options: "i" } : null;
    }
    if (category) {
      query.category = category ? { $regex: category, $options: "i" } : null;
    }
    if (subcategory) {
      query.subcategory = subcategory
        ? { $regex: subcategory, $options: "i" }
        : null;
    }

    const productsByCategoryName = await Category.findOne({
      name: query.category,
    });
    const productsByCategorySubName = await Subcategory.findOne({
      name: query.subcategory,
    });
    const products = await Product.find({
      $or: [
        { title: query.title },
        { categories: productsByCategoryName?._id },
        { sub_categories: productsByCategorySubName?._id },
      ],
    })
      .limit(6)
      .populate("categories sub_categories");

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 *
 *
 */

/**
 *
 * @param {*} req
 * @param {*} res
 */
const searchCateProducts = async (req, res) => {
  if (req.query.subcategory) {
    const subcategory = req.query.subcategory.split(",");

    try {
      const productsByCategorySubName = await Subcategory.find({
        name: { $in: subcategory },
      }).populate("id_prod");

      res.status(200).json(productsByCategorySubName);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};
const searchSimilarProduct = async (req, res) => {
  if (req.query.subcategory) {
    const limit = 4;
    const totalDocuments = await Product.countDocuments({
      sub_categories: req.query.subcategory,
    });
    const randomSkip = Math.floor(Math.random() * (totalDocuments / limit));
    try {
      const productsByCategorySubName = await Product.find({
        sub_categories: req.query.subcategory,
      })
        .skip(randomSkip)
        .limit(limit);

      res.status(200).json(productsByCategorySubName);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};

const fs = require("fs");
const { log } = require("console");

const deleteImages = async (req, res) => {
  const filePath = req.body.filePath;

  Product.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { photos: filePath } },
    { new: true }
  )
    .then((updatedDocument) => {
      if (updatedDocument) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return res
              .status(200)
              .json({ message: "Array element deleted:", updatedDocument });
          } else {
            console.log("File deleted successfully");
          }
        });
      } else {
        return res.status(404).json("Document not found.");
      }
    })
    .catch((error) => {
      return res.status(500).json("Error updating document:", error);
    });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  updateProductById,
  deleteProductById,
  searchProducts,
  searchCateProducts,
  searchSimilarProduct,
  gegtImagesNames,
  deleteImages,
  getAllProductsSub,
  getAllProductsCat,
};
