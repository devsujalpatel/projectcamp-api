import { connectToDatabase } from '@/lib/mongoose';
import config from '@/config';
import app from './app';

const PORT = config.PORT;

connectToDatabase()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
  )
  .catch((err) => console.error(`Mongodb connection error`, err));
