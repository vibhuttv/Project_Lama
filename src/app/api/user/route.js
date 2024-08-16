import mongoose from "mongoose";

import User from "../../../models/User";

export async function GET(request) {
  try {
    const users = await User.find();
    return {
      status: 200,
      body: {
        users,
      },
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: err.message,
      },
    };
  }
}
