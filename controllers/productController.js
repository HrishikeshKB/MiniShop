const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const stock = req.body.stock !== undefined ? Number(req.body.stock) : 0;

    const product = new Product({
      name,
      price,
      description,
      image,
      stock
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update only provided fields
    if (req.body.name !== undefined) product.name = req.body.name;
    if (req.body.price !== undefined) product.price = req.body.price;
    if (req.body.description !== undefined) product.description = req.body.description;
    if (req.body.image !== undefined) product.image = req.body.image;
    if (req.body.stock !== undefined) product.stock = req.body.stock; // ✅ now stock updates

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  deleteProduct,
  updateProduct
};





