import connectDB from "../../../lib/dbConnect";
import Podcast from "../../../models/Podcast";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, text } = body;
    console.log("form data", { name, text });
    if (!name || !text) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }
    try {
      const podcast = await Podcast.create({
        name,
        text,
      });
      return new Response(JSON.stringify({ message: "Podcast created" }), {
        status: 201,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Error creating Podcast" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid request body" }), {
      status: 400,
    });
  }
}
export async function GET(request) {
  try {
    await connectDB();
    const podcasts = await Podcast.find({});
    return new Response(JSON.stringify(podcasts), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching podcasts" }),
      {
        status: 500,
      }
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
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }
    try {
      const podcast = await Podcast.findByIdAndUpdate(id, {
        name,
        text,
      });
      return new Response(JSON.stringify({ message: "Podcast updated" }), {
        status: 200,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Error updating Podcast" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid request body" }), {
      status: 400,
    });
  }
}
