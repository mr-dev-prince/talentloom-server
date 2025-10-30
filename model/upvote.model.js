import mongoose from "mongoose";

const upvoteSchema = new mongoose.Schema(
  {
    discussionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

upvoteSchema.index({ discussionId: 1, userId: 1 }, { unique: true });

export const Upvote = mongoose.model("Upvote", upvoteSchema);
