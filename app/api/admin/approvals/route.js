import { connect } from "../../../../lib/mongoose.js";
import User from "../../../../models/User.js";
import { verifyToken } from "../../../../lib/auth.js";

async function getCurrentUser(token) {
  const decoded = verifyToken(token);
  await connect();
  return User.findById(decoded.id).lean();
}

export async function GET(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });

  try {
    const token = auth.replace("Bearer ", "");
    const currentUser = await getCurrentUser(token);
    if (!currentUser || !currentUser.isMainAdmin)
      return new Response("Forbidden", { status: 403 });

    const pendingUsers = await User.find({
      requestedRole: "admin",
      approved: false,
    }).lean();

    return new Response(JSON.stringify(pendingUsers), { status: 200 });
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export async function POST(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });

  try {
    const token = auth.replace("Bearer ", "");
    const currentUser = await getCurrentUser(token);
    if (!currentUser || !currentUser.isMainAdmin)
      return new Response("Forbidden", { status: 403 });

    const body = await req.json();
    const { userId } = body;
    if (!userId) return new Response("Missing userId", { status: 400 });

    const updated = await User.findByIdAndUpdate(
      userId,
      { role: "admin", approved: true },
      { new: true },
    ).lean();

    if (!updated) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}
