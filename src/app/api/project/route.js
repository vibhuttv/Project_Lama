import connectDB from "../../../lib/dbConnect";
import Project from "../../../models/Project";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.JSON();
    const { name } = body;
    console.log("form data", { name });
    if (!name) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }
    try {
      const project = await Project.create({
        name,
      });
      return new Response(JSON.stringify({ message: "Project created" }), {
        status: 201,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Error creating project" }),
        { status: 500 }
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
