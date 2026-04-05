import { Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  image?: string;
  visibility: 'public' | 'private';
  createdAt: Date;
  updatedAt: Date;
}