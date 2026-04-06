import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { likeValidationSchema } from "./like.validation";
import { likeController } from "./like.controller";

const router = Router();

router.post(
  "/toggle",
  auth(),
  validateRequest(likeValidationSchema),
  likeController.toggleLike
);

router.get("/:targetId", auth(), likeController.getLikers);



export const LikeRouter = router;