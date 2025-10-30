import { Discussion } from "../model/discussion.model.js";
import { Upvote } from "../model/upvote.model.js";

export const toggleUpvote = async (req, res) => {
  try {
    const { discussionId } = req.body;
    const userId = req.user?.id;

    if (!discussionId)
      return res.status(400).json({ message: "discussionId is required." });

    const discussion = await Discussion.findById(discussionId);
    if (!discussion)
      return res.status(404).json({ message: "Discussion not found." });

    const existingUpvote = await Upvote.findOne({ discussionId, userId });

    if (existingUpvote) {
      await Upvote.findByIdAndDelete(existingUpvote._id);
      return res.status(200).json({ message: "Upvote removed." });
    }

    const upvote = await Upvote.create({ discussionId, userId });
    res.status(201).json({ message: "Upvoted successfully.", upvote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle upvote." });
  }
};

export const getUpvoteCount = async (req, res) => {
  try {
    const { discussionId } = req.params;

    const count = await Upvote.countDocuments({ discussionId });
    res.status(200).json({ discussionId, upvotes: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get upvote count." });
  }
};
