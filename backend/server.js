import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// configure .env file
dotenv.config();

// connect to database
connectDB();

const app = express();

// allow us pass json data through the body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// mount product routes
app.use("/api/products", productRoutes);

// mount user routes
app.use("/api/users", userRoutes);

// false url middleware handler
app.use(notFound);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
