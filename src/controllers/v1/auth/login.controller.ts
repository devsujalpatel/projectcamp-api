import { ApiResponse } from "@/utils/api-response";
import { ApiError } from "@/utils/api-error";
import { asyncHandler } from "@/utils/async-handler";
import User from "@/models/v1/user.model";

// Types
import type { Request, Response } from "express";
import type { IUser } from "@/types/user.types";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

type ReqBodyData = Pick<IUser, "email" | "password">;

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as ReqBodyData;

  if (!email || !password) {
    throw new ApiError({
      statusCode: 400,
      message: "Email or username and password are required",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }].filter(Boolean),
  }).select("_id username password email fullName");

  if (!existingUser) {
    throw new ApiError({
      statusCode: 404,
      message: "User with this email does not exists",
    });
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError({
      statusCode: 401,
      message: "Incorrect Password",
    });
  }

  const accessToken = generateAccessToken(existingUser._id);
  const refreshToken = generateRefreshToken(existingUser._id);

  type PublicUser = Pick<IUser, "username" | "email" | "fullName">;

  type LoginResponse = {
    user: PublicUser;
    accessToken: string;
    refreshToken: string;
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .json(
      new ApiResponse<LoginResponse>({
        statusCode: 200,
        message: "User logged in successfully",
        data: {
          user: {
            username: existingUser.username,
            email: existingUser.email,
            fullName: existingUser.fullName,
          },
          accessToken,
          refreshToken,
        },
      }),
    );
});
