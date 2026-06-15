import { connect } from "../../../../lib/mongoose.js";
import Product from "../../../../models/Product.js";
import { verifyToken } from "../../../../lib/auth.js";

export async function GET(req, { params }) {
  await connect();
  const { id } = await params;
  const p = await Product.findById(id).lean();
  if (!p) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(p));
}

export async function PUT(req, { params }) {
  const { id } = await params;
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
  const body = await req.json();
  await connect();
  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
  return new Response(JSON.stringify(updated));
}

export async function DELETE(req, { params }) {
  const { id } = await params;
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
  await Product.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}
