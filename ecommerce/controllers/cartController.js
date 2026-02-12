import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  const cart = await Cart.find().populate("productId");
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  const cartItem = await Cart.create({ productId, quantity });
  res.status(201).json(cartItem);
};

export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const item = await Cart.findOneAndUpdate(
    { productId },
    { quantity },
    { new: true }
  );
  res.json(item);
};

export const removeFromCart = async (req, res) => {
  await Cart.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "Item removed from cart" });
};
