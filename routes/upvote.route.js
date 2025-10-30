import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getUpvoteCount,
  toggleUpvote,
} from "../controller/upvote.controller.js";

const router = Router();

router.post("/", authMiddleware, toggleUpvote);
router.get("/:discussionId", getUpvoteCount);

export default router;
