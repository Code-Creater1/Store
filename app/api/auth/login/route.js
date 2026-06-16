import { connect } from "../../../../lib/mongoose.js";
import User from "../../../../models/User.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth.js";

export async function POST(req) {
  const body = await req.json();
  await connect();
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) return new Response("Invalid credentials", { status: 401 });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return new Response("Invalid credentials", { status: 401 });
  const token = signToken({ id: user._id, email: user.email, role: user.role });
  return new Response(
    JSON.stringify({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        requestedRole: user.requestedRole,
        approved: user.approved,
        isMainAdmin: user.isMainAdmin,
      },
    }),
    { status: 200 },
  );
}
