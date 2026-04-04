import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User is logged in successfully",
    data: {
      accessToken,
    },
  });
});

export const AuthController = {
  loginUser,
};