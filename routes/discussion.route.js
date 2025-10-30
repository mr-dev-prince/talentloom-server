import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createDiscussion,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussion,
} from "../controller/discussion.controller.js";

const router = Router();

router.post("/", authMiddleware, createDiscussion);
router.get("/:id", getDiscussion);
router.get("/", getAllDiscussions);
router.delete("/:id", authMiddleware, deleteDiscussion);

export default router;
