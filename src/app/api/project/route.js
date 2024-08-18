import connectDB from "../../../lib/connectDB";
import Project from "../../../models/Project";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("Request Body:", body);
    const { name, userId } = body;

    if (!name || !userId) {
      return new Response(
        JSON.stringify({ message: "Name and userId are required" }),
        { status: 400 }
      );
    }

    try {
      const project = await Project.create({
        name,
        userId,
      });
      return new Response(
        JSON.stringify({ message: "Project created", project }),
        {
          status: 201,
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          message: "Error creating project",
          error: err.message,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return new Response(
      JSON.stringify({ message: "Invalid request body", error: error.message }),
      {
        status: 400,
      }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const projects = await Project.find({});
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching projects" }),
      {
        status: 500,
      }
    );
  }
}
