import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: any) => {
  const result = (await Post.create(payload)).populate(
    "author",
    "firstName lastName profilePicture",
  );
  return result;
};

const getAllPostsFromDB = async (userId: string) => {
  
  const result = await Post.find({
    $or: [{ visibility: "public" }, { author: userId }],
  })
    .populate("author", "firstName lastName email profilePicture")
    .sort({ createdAt: -1 });

  return result;
};

export const postService = {
  createPostIntoDB,
  getAllPostsFromDB,
};
