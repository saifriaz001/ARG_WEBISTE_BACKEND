import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DbConnection/DBconnect.js";
import newsRoutes from "./Routes/NewsRoutes.js";
import MarketRoutes from "./Routes/MarketRoutes.js";
import LocationRoutes from "./Routes/LocationRoutes.js";
import ServiceRoutes from "./Routes/ServiceRoutes.js";
import ProjectRoutes from "./Routes/ProjectRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import ImagekitRoutes from "./Routes/ImagekitRoutes.js";
import TypeRoutes from "./Routes/TypeRoutes.js";
import JobRoutes from "./Routes/jobRoutes.js";
import projectArrayRoutes from "./Routes/projectArrayRoutes.js";
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // if you're using cookies or authorization headers
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.get("/", (req, res) => {
      res.send("✅ API is running with ES Modules");
    });

    app.use('/api/v1', newsRoutes);
    app.use('/api/v1', MarketRoutes);
    app.use('/api/v1', LocationRoutes);
    app.use('/api/v1', ServiceRoutes);
    app.use('/api/v1', ProjectRoutes);
    app.use('/api/v1', AuthRoutes);
    app.use('/api/v1', TypeRoutes);
    app.use('/api/v1', ImagekitRoutes);
    app.use('/api/v1', JobRoutes);
    app.use('/api/v1', projectArrayRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
