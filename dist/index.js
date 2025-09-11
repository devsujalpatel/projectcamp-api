import express from "express";
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT ?? 8000;
app.get("/", (req, res) => {
    res.end("Hello from project camp");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
