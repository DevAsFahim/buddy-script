import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { commentService } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const authorId = req.user?.userId;

  const commentData = {
    ...req.body,
    author: authorId,
  };

  const result = await commentService.createCommentIntoDB(commentData);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: req.body.parentId ? "Reply added!" : "Comment added!",
    data: result,
  });
});

const getComments = catchAsync(async (req, res) => {
  const { postId } = req.params as { postId: string };
  const result = await commentService.getCommentsByPostIdFromDB(postId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

export const commentController = {
  createComment,
  getComments,
};
