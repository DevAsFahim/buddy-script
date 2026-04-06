import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { PostRouter } from "../modules/post/post.route";
import { CommentRouter } from "../modules/comment/comment.router";
import { LikeRouter } from "../modules/like/like.route";

const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/post", PostRouter);
router.use("/comment", CommentRouter);
router.use("/like", LikeRouter);


export default router;
