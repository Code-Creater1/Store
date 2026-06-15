import { connect } from "../../../lib/mongoose.js";
import Order from "../../../models/Order.js";
import Cart from "../../../models/Cart.js";
import Product from "../../../models/Product.js";
import { verifyToken } from "../../../lib/auth.js";

export async function POST(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });
  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);
    await connect();
    const cart = await Cart.findOne({ userId: decoded.id }).lean();
    if (!cart || cart.products.length === 0)
      return new Response("Cart empty", { status: 400 });
    const products = [];
    let total = 0;
    for (const item of cart.products) {
      const p = await Product.findById(item.productId).lean();
      if (!p) continue;
      products.push({ productId: p._id, quantity: item.quantity });
      total += (p.price || 0) * (item.quantity || 1);
    }
    const order = await Order.create({
      userId: decoded.id,
      products,
      totalAmount: total,
    });
    await Cart.findOneAndUpdate({ userId: decoded.id }, { products: [] });
    return new Response(JSON.stringify(order), { status: 201 });
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export async function GET(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });
  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);
    await connect();
    const orders = await Order.find({ userId: decoded.id })
      .populate("products.productId")
      .lean();
    return new Response(JSON.stringify(orders));
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
}
