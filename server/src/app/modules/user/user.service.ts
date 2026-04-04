import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (data: IUser) => {
    const user = await User.create(data);
    const { password, ...result } = user.toObject();
    return result;
};

export const userService = {
    createUserIntoDB
};