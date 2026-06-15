import { connect } from "../../../../lib/mongoose.js";
import User from "../../../../models/User.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth.js";

export async function POST(req) {
  const body = await req.json();
  await connect();
  const { name, email, password } = body;
  if (!email || !password || !name)
    return new Response("Missing fields", { status: 400 });
  const existing = await User.findOne({ email });
  if (existing) return new Response("User exists", { status: 409 });
  const hash = await bcrypt.hash(password, 10);
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "admin" : "user";
  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  });
  const token = signToken({ id: user._id, email: user.email, role: user.role });
  return new Response(
    JSON.stringify({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    }),
    { status: 201 },
  );
}
