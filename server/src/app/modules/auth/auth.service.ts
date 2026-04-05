import { StatusCodes } from "http-status-codes";
import config from "../../config";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User doesn't exist");
  }

  // Check password
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "Email or Password is incorrect");
  }

  // Prepare JWT payload
  const jwtPayload = {
    userId: user._id,
    email: user.email,
  };

  // 4. Generate tokens
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
