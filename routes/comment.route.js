import express from "express";

import {
  createComment,
  getCommentsByDiscussion,
} from "../controller/comment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/:discussionId", getCommentsByDiscussion);

export default router;
