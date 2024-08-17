import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "DONE",
    enum: ["DONE", "INPROGRESS"],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  updationDate: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

module.exports =
  mongoose.models.Podcast || mongoose.model("Podcast", podcastSchema);
