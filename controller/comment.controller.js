import { Comment } from "../model/comment.model.js";
import { Discussion } from "../model/discussion.model.js";

export const createComment = async (req, res) => {
  try {
    const { discussionId, content } = req.body;
    const userId = req.user?.id;

    if (!discussionId || !content) {
      return res
        .status(400)
        .json({ message: "discussionId and content are required." });
    }

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found." });
    }

    const comment = await Comment.create({
      discussionId,
      userId,
      content,
    });

    res.status(201).json({
      message: "Comment added successfully.",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create comment." });
  }
};

export const getCommentsByDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;

    const comments = await Comment.find({ discussionId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get comments." });
  }
};
