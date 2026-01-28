import mongoose, { Schema } from "mongoose";

export interface IUser {
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

const userSchema = new Schema<IUser>(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: ``,
      },
    },
    username: {
      type: String,
      required: [true, "User is required"],
      maxLength: [20, "Username must be less than 20 characters"],
      unique: [true, "Username must be unique"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      maxLength: [50, "Email must be less than 50 characters"],
      unique: [true, "Email must be unique"],
      lowercase: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      maxLength: [50, "Full name must be less than 50 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
