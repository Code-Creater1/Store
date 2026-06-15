import { connect } from "../../../lib/mongoose.js";
import Cart from "../../../models/Cart.js";
import { verifyToken } from "../../../lib/auth.js";

export async function GET(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });
  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);
    await connect();
    const cart = (await Cart.findOne({ userId: decoded.id })
      .populate("products.productId")
      .lean()) || { products: [] };
    return new Response(JSON.stringify(cart));
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export async function POST(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });
  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);
    const body = await req.json();
    await connect();
    let cart = await Cart.findOne({ userId: decoded.id });
    if (!cart) cart = await Cart.create({ userId: decoded.id, products: [] });
    const { productId, quantity = 1 } = body;
    const idx = cart.products.findIndex(
      (p) => p.productId.toString() === productId,
    );
    if (idx >= 0) cart.products[idx].quantity += quantity;
    else cart.products.push({ productId, quantity });
    await cart.save();
    const populatedCart = await cart.populate("products.productId");
    return new Response(JSON.stringify(populatedCart));
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
}
