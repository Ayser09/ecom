const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");
const fs = require("fs");
exports.deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    return res.status(200).send({
      success: true,
      message: " product deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

exports.updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.fields;
    // Validation checks
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case req.fields.photo && req.fields.photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name),
        description,
        price,
        category,
        quantity,
        shipping,
      },
      { new: true } // Return the updated product
    );

    // Update the photo if provided
    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }

    // Save the updated product
    await updatedProduct.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

exports.productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo, data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

exports.singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug }) // Use findOne with the desired field
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Single product listed",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

exports.getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalProducts: product.length,
      message: " all product Listed",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting product",
      error: error.message,
    });
  }
};
exports.createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.fields;
    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(200).send({
        success: true,
        message: "Product already exists",
      });
    }

    // Validation checks
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case req.fields.photo && req.fields.photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (req.fields.photo) {
      product.photo.data = fs.readFileSync(req.fields.photo.path);
      product.photo.contentType = req.fields.photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "New product created",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Could not create product",
      error,
    });
  }
};
