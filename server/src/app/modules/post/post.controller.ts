import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { postService } from "./post.service";
import { uploadToCloudinary } from "../../utils/cloudinary";

const createPost = catchAsync(async (req, res) => {
  const authorId = req.user?.userId;
  
  let imageUrl = null;

  // Handle the image if it exists in the request
  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.path);
  }

  // Merge form-data fields and the Cloudinary URL
  const postData = {
    ...req.body,
    image: imageUrl,
    author: authorId,
  };

  const result = await postService.createPostIntoDB(postData);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Post created successfully!",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await postService.getAllPostsFromDB(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Feed retrieved successfully!",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPosts,
};
