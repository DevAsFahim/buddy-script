import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);

export const UserRouter = router;
