import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  avatar: {
    url?: string;
    localPath?: string;
  };
  username: string;
  email: string;
  fullName: string;
  password: string;
  isEmailVerified?: boolean;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
}
