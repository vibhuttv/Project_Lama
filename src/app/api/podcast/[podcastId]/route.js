import connectDB from "@/lib/connectDB";
import Podcast from "@/models/Podcast";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();

  const { podcastId } = params;

  try {
    const deletedPodcast = await Podcast.findByIdAndDelete(podcastId);

    if (!deletedPodcast) {
      return NextResponse.json(
        { message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Podcast deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting podcast:", error);
    return NextResponse.json(
      { message: "Error deleting podcast" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  await connectDB();

  const { podcastId } = params;

  try {
    const podcast = await Podcast.findById(podcastId);

    if (!podcast) {
      return NextResponse.json(
        { message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ podcast }, { status: 200 });
  } catch (error) {
    console.error("Error fetching podcast:", error);
    return NextResponse.json(
      { message: "Error fetching podcast" },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  await connectDB();

  const { podcastId } = params;

  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { message: "Text is required" },
        { status: 400 }
      );
    }

    const updatedPodcast = await Podcast.findByIdAndUpdate(
      podcastId,
      { text: text, updationDate: Date.now() },
      { new: true }
    );

    if (!updatedPodcast) {
      return NextResponse.json(
        { message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Text updated successfully", podcast: updatedPodcast },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating text:", error);
    return NextResponse.json(
      { message: "Failed to update text" },
      { status: 500 }
    );
  }
}
