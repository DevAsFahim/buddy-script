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

const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await userService.getMeFromDB(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getMe
};
