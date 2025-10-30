import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    public: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Discussion = mongoose.model("Discussion", discussionSchema);
