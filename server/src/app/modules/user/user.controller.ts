import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
};
