import type { Request, Response } from "express";

export const verifyUser = async (req: Request, res: Response) => {
  const unhashedToken = req.params.unhashedToken;

  res.status(200).json({
    unhashedToken,
  });
};
