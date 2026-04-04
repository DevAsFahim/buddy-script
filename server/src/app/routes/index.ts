import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";

const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
