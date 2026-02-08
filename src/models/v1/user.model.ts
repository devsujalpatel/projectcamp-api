import mongoose, { Schema, Types, type HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import type { IUser, IUserMethods } from "@/types/user.types";
import type { Model } from "mongoose";

type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser, {}, IUserMethods>(
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

userSchema.pre("save", async function (this: HydratedDocument<IUser>) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (
  this: UserDocument,
  password: string,
) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser, Model<IUser, {}, IUserMethods>>(
  "User",
  userSchema,
);
