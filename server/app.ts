import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import XMLRoutes from "./routes/XMLRoutes";

connectDB();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", XMLRoutes);

const PORT = process.env.PORT || 1717;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


export default app