import { Schema, model, Document, Types } from 'mongoose';
import { ILike } from './like.interface';

const likeSchema = new Schema<ILike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'targetModel', // Dynamic reference
    },
    targetModel: {
      type: String,
      required: true,
      enum: ['Post', 'Comment'],
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.index({ userId: 1, targetId: 1 }, { unique: true });
likeSchema.index({ targetId: 1 });

export const Like = model<ILike>('Like', likeSchema);