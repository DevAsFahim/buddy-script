import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: IComment) => {
  const result = await Comment.create(payload);

  return result.populate("author", "firstName lastName");
};

const getCommentsByPostIdFromDB = async (postId: string) => {
  return await Comment.find({ postId })
    .populate("author", "firstName lastName")
    .sort({ createdAt: -1 });
};

export const commentService = {
  createCommentIntoDB,
  getCommentsByPostIdFromDB,
};
