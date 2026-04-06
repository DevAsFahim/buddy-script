import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { commentValidationSchema } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = Router();


router.post(
  "/",
  auth(), 
  validateRequest(commentValidationSchema), 
  commentController.createComment
);

router.get("/:postId", auth(), commentController.getComments);

export const CommentRouter = router;