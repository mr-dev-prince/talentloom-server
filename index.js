import express from "express";
import cors from "cors";
import "dotenv/config.js";
import userRouter from "./routes/user.route.js";
import { connectDb } from "./db/connect.js";
import discussionRouter from "./routes/discussion.route.js";
import commentRouter from "./routes/comment.route.js";
import upvoteRouter from "./routes/upvote.route.js";

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/discussion", discussionRouter);
app.use("/comment", commentRouter);
app.use("/upvote", upvoteRouter);

app.get("/", (req, res) => res.send("Talentloom hackathon server"));

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server running at ${process.env.PORT}`)
);
