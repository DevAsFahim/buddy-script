import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);

router.get("/me", auth(), userController.getMe);

export const UserRouter = router;
