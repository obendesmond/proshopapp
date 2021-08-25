import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  let token;

  //   check if authorization exists in the header and check if it starts with Bearer
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // verify the users token and store the information passed (_id)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find and return user except the password.
      // we'll have access to user in all of our protected routes
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
