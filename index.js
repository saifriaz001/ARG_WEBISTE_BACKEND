import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './DbConnection/DBconnect.js';
import newsRoutes from './Routes/NewsRoutes.js';
import MarketRoutes from "./Routes/MarketRoutes.js";
import LocationRoutes from "./Routes/LocationRoutes.js";
import ServiceRoutes from "./Routes/ServiceRoutes.js";
import ProjectRoutes from "./Routes/ProjectRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import ImagekitRoutes from "./Routes/ImagekitRoutes.js";
import TypeRoutes from "./Routes/TypeRoutes.js";
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're using cookies or authorization headers
}));

app.use(express.json()); 
app.use(cookieParser());       

const startServer = async () =>{
    try {
        await connectDB(); // Connect to MongoDB
    } catch (error) {
    }
}


startServer();

app.get('/', (req ,res)=>{
    res.send("API is running with Es Modules");
})

app.use('/api/v1', newsRoutes); // Use the news routes
app.use("/api/v1", MarketRoutes);
app.use("/api/v1", LocationRoutes); // Use the market routes
app.use("/api/v1", ServiceRoutes);
app.use("/api/v1", ProjectRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", TypeRoutes); // Use the type routes
app.use("/api/v1", ImagekitRoutes); // Use the auth routes
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});