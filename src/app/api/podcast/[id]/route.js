import connectDB from "@/lib/connectDB";
import Podcast from "@/models/Podcast";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const deletedPodcast = await Podcast.findByIdAndDelete(id);

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
