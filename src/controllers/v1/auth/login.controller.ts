import { ApiResponse } from "@/utils/api-response";
import { ApiError } from "@/utils/api-error";
import { asyncHandler } from "@/utils/async-handler";
import User from "@/models/v1/user.model";

// Types
import type { Request, Response } from "express";
import type { IUser } from "@/types/user.types";

type UserData = Pick<IUser, "email" | "password">;

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as UserData;

  if (!email || !password) {
    throw new ApiError({
      statusCode: 400,
      message: "Email or username and password are required",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }].filter(Boolean),
  }).select("username password email fullName");

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

  type UserResponse = Pick<IUser, "username" | "email" | "fullName">;

  const userResponse: UserResponse = {
    username: existingUser.username,
    email: existingUser.email,
    fullName: existingUser.fullName,
  };

  return res.status(200).json(
    new ApiResponse<UserResponse>({
      statusCode: 200,
      message: "User logged in successfully",
      data: userResponse,
    }),
  );
});
