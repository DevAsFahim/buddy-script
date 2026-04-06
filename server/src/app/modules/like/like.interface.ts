import { Types } from "mongoose";

export interface ILike extends Document {
  userId: Types.ObjectId;
  targetId: Types.ObjectId;
  targetModel: 'Post' | 'Comment';
}