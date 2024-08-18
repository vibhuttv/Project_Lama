import connectDB from "@/lib/connectDB";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = params;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $inc: { numberOfPodcasts: -1 }, updationDate: Date.now() },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (updatedProject.numberOfPodcasts < 0) {
      updatedProject.numberOfPodcasts = 0;
      await updatedProject.save();
    }

    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project's podcast count" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
