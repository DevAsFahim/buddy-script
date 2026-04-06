import { Types } from "mongoose";

export interface IComment extends Document {
  postId: Types.ObjectId;
  author: Types.ObjectId;
  text: string;
  parentId: Types.ObjectId | null;
  createdAt: Date;
}
