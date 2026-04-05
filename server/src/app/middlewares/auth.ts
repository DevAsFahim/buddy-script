import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const headerToken = req.headers.authorization;

    const token = headerToken?.split(" ")[1];

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
