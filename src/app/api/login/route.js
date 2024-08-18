import * as jose from "jose";
import connectDB from "../../../lib/connectDB";
import bcrypt from "bcryptjs";
import User from "../../../models/User";

export async function POST(request) {
  await connectDB();

  try {
    // Read data
    const data = await request.json();
    const { email, password } = data;

    // Validate data
    if (!email || !password) {
      console.log("All fields are required");
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 400,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid Password");
      return new Response(JSON.stringify({ message: "Invalid Password" }), {
        status: 400,
      });
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("70h")
      .setSubject(user.id.toString())
      .sign(secret);

    // Respond with jwt
    return new Response(JSON.stringify({ token: jwt }), { status: 200 });
  } catch (error) {
    console.error("An error occurred during login:", error);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
