import express from 'express';
import cors from 'cors';
import config from '@/config';

const app = express();

// Basic configuration
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// cors configuration
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// routes
import healthCheckRouter from '@/routes/healcheck.route';
import authRoutes from '@/routes/user.route';

app.get('/', (req, res) => {
  res.send('Hello from project camp');
});

app.use('/api/v1/', healthCheckRouter);
app.use('/api/v1/auth', authRoutes);

export default app;
