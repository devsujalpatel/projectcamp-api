import { ApiResponse } from "@/utils/api-response";
import { ApiError } from "@/utils/api-error";
import { asyncHandler } from "@/utils/async-handler";
import User from "@/models/v1/user.model";

// Types
import type { Request, Response } from "express";
import type { IUser } from "@/types/user.types";
import { generateRefreshToken, generateTemporaryToken } from "@/lib/jwt";
import { emailVerificationMailgenContent, sendEmail } from "@/utils/mailer";

type UserData = Pick<IUser, "fullName" | "username" | "email" | "password">;

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email, username, password } = req.body as UserData;

    if (!email || !username || !password || !fullName) {
      throw new ApiError({
        statusCode: 400,
        message: "Email, username, fullName and password are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ApiError({
        statusCode: 409,
        message: "User with email or username already exists",
      });
    }

    const newUser = await User.create({
      fullName,
      username,
      email,
      password,
      isEmailVerified: false,
    });

    const { unHashedToken, hashedToken, tokenExpiry } =
      generateTemporaryToken();

    // const refreshToken = generateRefreshToken(newUser._id);

    // newUser.refreshToken = refreshToken;

    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationExpiry = tokenExpiry;
    await newUser.save({ validateBeforeSave: false });

    await sendEmail({
      to: newUser.email,
      subject: "Please verify your email",
      mailgenContent: emailVerificationMailgenContent(
        newUser.username,
        `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashedToken}`,
      ),
    });

    const createdUser = await User.findById(newUser._id).select(
      "-password -emailVerificationToken -emailVerificationExpiry",
    );

    if (!createdUser) {
      throw new ApiError({
        statusCode: 500,
        message: "Something went wrong while registring the user",
      });
    }

    type UserResponse = Omit<
      IUser,
      | "password"
      // | "refreshToken"
      | "emailVerificationToken"
      | "emailVerificationExpiry"
    >;

    const userResponse: UserResponse = {
      _id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email,
      username: createdUser.username,
      avatar: createdUser.avatar,
      isEmailVerified: createdUser.isEmailVerified,
    };

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        data: userResponse,
        message:
          "User registered successfully and verification email has been sent on your email",
      }),
    );
  },
);
