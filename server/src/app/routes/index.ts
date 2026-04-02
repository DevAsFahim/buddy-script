import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";

const router = Router();

router.use("/user", UserRouter);

export default router;
