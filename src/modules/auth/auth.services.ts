import { configs } from "#src/initializers/config";
import OTP, { IOTP } from "#src/modules/auth/otp.model";
import User, { IUser } from "#src/modules/user/user.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
export default class AuthService {
  static async getProfile(id: any) {
    return await AuthService.fetchUserById(id);
  }
  static async login(email: string): Promise<any> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw { name: "UnauthorizedError", error: "Invalid email" };
    }

    console.log(user);

    const otpDoc = await this.createOTP({ userId: user._id });
    console.log(otpDoc);
    return {
      message: "OTP sent to your email",
      otp: otpDoc.otp,
      id: otpDoc.id,
    };
  }

  static async register({ data }: { data: IUser }): Promise<any> {
    const user = await this.findUserByEmail(data.email);
    if (user) {
      throw { name: "UnauthorizedError", error: "Email already exists" };
    }

    const newUser = await User.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    const otpDoc = await this.createOTP({ userId: newUser.id });
    console.log(otpDoc);

    return {
      message: "OTP sent to your email",
      otp: otpDoc.otp,
      id: otpDoc.id,
    };
  }

  static async verifyOTP({
    id,
    otp,
  }: {
    id: string;
    otp: string;
  }): Promise<any> {
    const otpDoc = await OTP.findOne({ _id: new Types.ObjectId(id), otp });

    if (!otpDoc) {
      throw { name: "UnauthorizedError", error: "OTP Expired " };
    }
    console.log(otpDoc.user);

    const user = await this.fetchUserById(otpDoc.user.toString());
    console.log(user);

    if (!user) {
      throw { name: "UnauthorizedError", error: "User not found" };
    }
    const token = await this.generateToken(user);
    // delete the otp document
    await OTP.deleteOne({ _id: otpDoc._id });
    return {
      message: "OTP verified",
      token: token,
      user: user,
    };
  }

  private static async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email }).lean().exec();
    } catch (error) {
      return null;
    }
  }

  static async fetchUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(new Types.ObjectId(id)).lean();
    } catch (error) {
      return null;
    }
  }

  private static async generateToken(user: Partial<IUser>) {
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
  }

  static verifyToken(token: string) {
    return jwt.verify(token, configs.JWT_SECRET);
  }

  private static async createOTP({
    userId,
  }: {
    userId: string | undefined | unknown;
  }): Promise<IOTP> {
    const otp = Math.floor(100110 + Math.random() * 90000).toString();

    const otpDoc = await OTP.create({ user: userId, otp });
    return otpDoc;
  }
}
