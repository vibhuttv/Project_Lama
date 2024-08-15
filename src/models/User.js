import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
