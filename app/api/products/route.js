import { connect } from "../../../lib/mongoose.js";
import Product from "../../../models/Product.js";
import { verifyToken } from "../../../lib/auth.js";

export async function GET() {
  await connect();
  const products = await Product.find().lean();
  return new Response(JSON.stringify(products));
}

export async function POST(req) {
  const body = await req.json();
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });
  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);
    if (decoded.role !== "admin")
      return new Response("Forbidden", { status: 403 });
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
  await connect();
  const p = await Product.create(body);
  return new Response(JSON.stringify(p), { status: 201 });
}
