import { configs } from "#src/initializers/config";
import User, { IUser } from "#src/modules/user/user.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (user: IUser) => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return token;
  } catch (error) {
    return null;
  }
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, configs.JWT_SECRET);
};

export const fetchUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(new Types.ObjectId(id), {
    $set: {
      lastActive: new Date(),
    },
  });
  return user;
};
