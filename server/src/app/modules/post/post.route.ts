import { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { postValidation } from "./post.validation";
import { upload } from "../../middlewares/multer";

const router = Router();

router.post(
  "/create-post",
  auth(),
  upload.single('image'),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(postValidation.postValidationSchema),
  postController.createPost,
);

export const PostRouter = router;
