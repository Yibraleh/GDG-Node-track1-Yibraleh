import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const cartItems = await Cart.find();

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;

  for (let item of cartItems) {
    const product = await Product.findById(item.productId);

    if (product.stock < item.quantity) {
      return res.status(400).json({ message: "Stock not enough" });
    }

    product.stock -= item.quantity;
    await product.save();

    total += product.price * item.quantity;
  }

  const order = await Order.create({
    items: cartItems,
    total
  });

  await Cart.deleteMany();
  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};
