import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: any) => {
  const result = (await Post.create(payload)).populate("author", "firstName lastName");
  return result;
};

export const postService = {
  createPostIntoDB,
};