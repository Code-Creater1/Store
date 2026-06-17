import { connect } from "../../../../lib/mongoose.js";
import User from "../../../../models/User.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth.js";

export async function POST(req) {
  try {
    const body = await req.json();

    await connect();

    const { name, email, password, role } = body;

    if (!email || !password || !name) {
      return new Response("Missing fields", { status: 400 });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return new Response("User exists", { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);

    const userCount = await User.countDocuments();

    const requestedRole = role === "admin" ? "admin" : "user";

    const isFirstUser = userCount === 0;

    const user = await User.create({
      name,
      email,
      password: hash,
      role: isFirstUser ? "admin" : "user",
      requestedRole: isFirstUser ? "admin" : requestedRole,
      approved: isFirstUser ? true : requestedRole !== "admin",
      isMainAdmin: isFirstUser,
    });

    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return Response.json(
      {
        token,
        user,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return new Response(err.message, { status: 500 });
  }
}
