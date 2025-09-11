import express, { Request, Response } from 'express';
import { connectToDatabase } from './lib/mongoose';
import config from '@/config';
import userModel from './models/user.model';

const app = express();

const PORT = config.PORT;

app.use(express.json());

connectToDatabase();

app.get('/', (req: Request, res: Response) => {
  res.end('Hello from project camp');
});

app.post('/api/v1/users/register', async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body as {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };

  try {
    const user = await userModel.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    userModel.create({
      firstname,
      lastname,
      email,
      password,
    });

    res.json({
      firstname,
      lastname,
      email,
      password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
