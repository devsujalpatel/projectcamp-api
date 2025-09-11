import express, { Request, Response } from 'express';
import { connectToDatabase } from '@/lib/mongoose';
import config from '@/config';

const app = express();

const PORT = config.PORT;

app.use(express.json());

connectToDatabase();

app.get('/', (req: Request, res: Response) => {
  res.end('Hello from project camp');
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
