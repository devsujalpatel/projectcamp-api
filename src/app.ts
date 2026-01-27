import express from 'express';
import "dotenv/config"
import cors from 'cors';

const app = express();

// basic configuration 
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'))

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

// Sample route
app.get('/', (req, res) => {
    res.end('Hello, World!');
});


export default app;