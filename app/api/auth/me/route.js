import { connect } from "../../../../lib/mongoose.js";
import User from "../../../../models/User.js";
import { verifyToken } from "../../../../lib/auth.js";

export async function GET(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });

  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);
    await connect();
    const user = await User.findById(decoded.id).lean();
    if (!user) return new Response("Unauthorized", { status: 401 });

    return new Response(
      JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        requestedRole: user.requestedRole,
        approved: user.approved,
        isMainAdmin: user.isMainAdmin,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}
