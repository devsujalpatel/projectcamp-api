import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
  } catch (error) {}
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
  } catch (error) {}
};

export const logout = async (req: Request, res: Response) => {
  req.cookies.jwt = '';
  res.status(200).json({ message: 'Logout successful' });
};

export const verfiy = async (req: Request, res: Response) => {};

export const update = async (req: Request, res: Response) => {};

export const deleteUser = async (req: Request, res: Response) => {};
