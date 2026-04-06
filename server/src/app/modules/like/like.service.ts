import { ILike } from "./like.interface";
import { Like } from "./like.model";

const toggleLikeInDB = async (payload: ILike) => {
  const { userId, targetId, targetModel } = payload;

  const isExist = await Like.findOne({ userId, targetId });

  if (isExist) {
    await Like.findByIdAndDelete(isExist._id);
    return { isLiked: false };
  } else {
    await Like.create(payload);
    return { isLiked: true };
  }
};

const getLikersByTargetIdFromDB = async (targetId: string) => {
  return await Like.find({ targetId })
    .populate("userId", "firstName lastName profilePicture")
    .select("userId");
};

export const LikeService = {
  toggleLikeInDB,
  getLikersByTargetIdFromDB,
};