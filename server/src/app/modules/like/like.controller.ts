import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { LikeService } from "./like.service";

const toggleLike = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  
  const result = await LikeService.toggleLikeInDB({
    ...req.body,
    userId,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: result.isLiked ? "Liked successfully" : "Unliked successfully",
    data: result,
  });
});

const getLikers = catchAsync(async (req, res) => {
  const { targetId } = req.params as { targetId: string };
  const result = await LikeService.getLikersByTargetIdFromDB(targetId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Likers retrieved successfully",
    data: result,
  });
});

export const likeController = {
  toggleLike,
  getLikers,
};