import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  updationDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numberOfPodcasts: {
    type: Number,
    default: 0,
  },
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
