import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const userController = {
  createUser,
};
