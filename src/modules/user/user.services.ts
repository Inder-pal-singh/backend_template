import AuthService from "#src/modules/auth/auth.services";
import User, { IUser } from "#src/modules/user/user.model";
import { Types } from "mongoose";

export default class UserService {
  static async getProfile(user: string) {
    return await AuthService.fetchUserById(user);
  }
  static async updateProfile({
    id,
    data,
  }: {
    id: string;
    data: Partial<IUser>;
  }) {
    const user = await User.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      data,
      {
        new: true,
      }
    ).lean();
    if (!user) {
      throw { name: "UnauthorizedError", error: "Invalid user" };
    }

    return {
      message: "Profile updated successfully",
      ...user,
    };
  }
}
