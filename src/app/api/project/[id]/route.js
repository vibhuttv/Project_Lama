import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.notFound();
  }
  return NextResponse.json(project);
}
