import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/users", userRoutes);

export default app;
