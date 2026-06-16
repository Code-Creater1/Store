// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// async function run() {
//   await mongoose.connect("YOUR_MONGO_URI_HERE");

//   const existing = await User.findOne({ email: "dave@admin.com" });

//   if (existing) {
//     console.log("Main admin already exists");
//     process.exit();
//   }

//   const hashedPassword = await bcrypt.hash("123456", 10);

//   await User.create({
//     name: "Dave",
//     email: "dave@admin.com",
//     password: hashedPassword,
//     role: "admin",
//     isMainAdmin: true,
//     approved: true,
//   });

//   console.log("Main admin created successfully");
//   process.exit();
// }

// run();





import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env file");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "dave@admin.com" });

  if (existing) {
    console.log("Main admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Dave",
    email: "dave@admin.com",
    password: hashedPassword,
    role: "admin",
    isMainAdmin: true,
    approved: true,
  });

  console.log("Main admin created successfully");
  process.exit();
}

run();
