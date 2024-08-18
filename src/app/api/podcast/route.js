import connectDB from "../../../lib/connectDB";
import Podcast from "../../../models/Podcast";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, text, user, project } = body;

    console.log("form data", { name, text, user, project });

    if (!name || !text || !user || !project) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const podcast = await Podcast.create({
      name,
      text,
      user,
      project,
    });

    return NextResponse.json(
      { message: "Podcast created", podcast },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Podcast:", error);
    return NextResponse.json(
      { message: "Error creating Podcast" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("project");

    let podcasts;

    if (projectId) {
      podcasts = await Podcast.find({ project: projectId });
    } else {
      podcasts = await Podcast.find({});
    }

    return NextResponse.json(podcasts, { status: 200 });
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json(
      { message: "Error fetching podcasts" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, name, text } = body;

    console.log("form data", { id, name, text });

    if (!id || !name || !text) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const podcast = await Podcast.findByIdAndUpdate(
      id,
      { name, text },
      { new: true }
    );

    if (!podcast) {
      return NextResponse.json(
        { message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Podcast updated", podcast },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Podcast:", error);
    return NextResponse.json(
      { message: "Error updating Podcast" },
      { status: 500 }
    );
  }
}
