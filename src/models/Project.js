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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  numberOfPodcasts: {
    type: Number,
    default: 0,
  },
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
