import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { PostRouter } from "../modules/post/post.route";

const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/post", PostRouter);

export default router;
