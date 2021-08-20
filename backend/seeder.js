import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //empty the three collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // do insertions in user collection
    const createdUsers = await User.insertMany(users);

    // get admins (first users) id
    const adminUser = createdUsers[0]._id;

    // loop through the products and add the admin id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // do insertions in the products collection
    await Product.insertMany(sampleProducts);

    console.log(`Data Imported!`.green.inverse);
    process.exit(); //exit with success
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1); // exit with failure
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data Destroyed!`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

/* destroy data if a second argument of '-d' is passed
 so we'll get something like
  from-proshop> npm run backend/seeder || npm run backend/seeder -d
 */
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
