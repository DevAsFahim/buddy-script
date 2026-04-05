import { NextFunction, Request, Response, Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { postValidation } from "./post.validation";
import { upload } from "../../middlewares/multer";

const router = Router();

router.post(
  "/create-post",
  auth(),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(postValidation.postValidationSchema),
  postController.createPost,
);

router.get("/", auth(), postController.getAllPosts);


export const PostRouter = router;
