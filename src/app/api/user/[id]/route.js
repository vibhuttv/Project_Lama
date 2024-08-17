import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.notFound();
  }
  return NextResponse.json(user);
}
