import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// configure .env file
dotenv.config();

// connect to database
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// allow us pass json data through the body
app.use(express.json());

// mount product routes
app.use("/api/products", productRoutes);

// mount user routes
app.use("/api/users", userRoutes);

// mount order routes
app.use("/api/orders", orderRoutes);

// mout paypal route to return paypal client id
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// mount upload routes
app.use("/api/upload", uploadRoutes);

// make /uploads folder static so that it can be called from the browser
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// for deploying
if (process.env.NODE_ENV === "production") {
  // set build folder to a static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // point any route to index.html in static folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

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
