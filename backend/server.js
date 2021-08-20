import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// mount product routes
app.use("/api/products", productRoutes);

// false url middleware handler
app.use(notFound);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
