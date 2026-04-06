import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (data: IUser) => {
    const user = await User.create(data);
    const { password, ...result } = user.toObject();
    return result;
};

const getMeFromDB = async (userId: string) => {
  return await User.findById(userId);
};

export const userService = {
    createUserIntoDB,
    getMeFromDB
};