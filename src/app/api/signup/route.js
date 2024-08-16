// import validateEmail from "@/helpers/validateEmail";
import connectDB from "../../../lib/dbConnect";
import bcrypt from "bcryptjs";
import User from "../../../models/User";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password } = body;

    console.log("form data", { name, email, password: "***" });

    // Validate data
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }
    // if (!validateEmail(email)) {
    //   return new Response(JSON.stringify({ message: "Invalid email" }), {
    //     status: 400,
    //   });
    // }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ message: "Password should be at least 6 characters" }),
        { status: 400 }
      );
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return new Response(JSON.stringify({ message: "Email already in use" }), {
        status: 400,
      });
    }

    // Hash password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    // Create user in DB
    try {
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      return new Response(JSON.stringify({ message: "User created" }), {
        status: 201,
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: "Error creating user" }), {
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid request body" }), {
      status: 400,
    });
  }
}
