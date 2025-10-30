import { Discussion } from "../model/discussion.model.js";
import { Upvote } from "../model/upvote.model.js";

// CREATE DISCUSSION
export const createDiscussion = async (req, res) => {
  try {
    const { title, content, public: isPublic } = req.body;
    const userId = req.user?.id; // assuming JWT middleware sets req.user

    if (!userId || !title || !content) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const discussion = await Discussion.create({
      userId,
      title,
      content,
      public: isPublic ?? true,
    });

    res.status(201).json({
      message: "Discussion created successfully.",
      discussion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create discussion." });
  }
};

// GET SINGLE DISCUSSION BY ID
export const getDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findById(id).populate(
      "userId",
      "name email"
    );
    
    if (!discussion)
      return res.status(404).json({ message: "Discussion not found." });

    const upvoteCount = await Upvote.countDocuments({ discussionId: id });

    res.status(200).json({ ...discussion.toObject(), upvotes: upvoteCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get discussion." });
  }
};

// GET ALL DISCUSSIONS (with sorting)
export const getAllDiscussions = async (req, res) => {
  try {
    const { sortBy } = req.query; // sortBy = 'upvotes' | 'newest' | 'oldest'

    let discussions = await Discussion.find()
      .populate("userId", "name email")
      .lean();

    // Attach upvote count for each discussion
    const discussionIds = discussions.map((d) => d._id);
    const upvoteCounts = await Upvote.aggregate([
      { $match: { discussionId: { $in: discussionIds } } },
      { $group: { _id: "$discussionId", count: { $sum: 1 } } },
    ]);

    const upvoteMap = upvoteCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.count;
      return acc;
    }, {});

    discussions = discussions.map((d) => ({
      ...d,
      upvotes: upvoteMap[d._id.toString()] || 0,
    }));

    // Sort discussions
    if (sortBy === "upvotes") {
      discussions.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === "oldest") {
      discussions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // Default: newest first
      discussions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json(discussions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get discussions." });
  }
};

// DELETE DISCUSSION
export const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const discussion = await Discussion.findById(id);
    if (!discussion)
      return res.status(404).json({ message: "Discussion not found." });

    if (discussion.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this discussion." });
    }

    await Discussion.findByIdAndDelete(id);
    await Upvote.deleteMany({ discussionId: id });

    res.status(200).json({ message: "Discussion deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete discussion." });
  }
};
