import express from 'express';
import "dotenv/config"

export const app = express();

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.end('Hello, World!');
});
