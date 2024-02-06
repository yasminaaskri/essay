import express, { Request, Response } from "express";

import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User";
import Product from "./models/Product";

const app = express();

mongoose
  .connect(
    "mongodb+srv://yasmine:1234@cluster0.yguhmob.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("error with connecting with the DB ", error);
  });

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

// Middleware to generate JWT token
function generateToken(userId: string) {
  return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
}

// Login route
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If email and password are correct, generate JWT token
    const token = generateToken(user._id);

    // Send token in response
    res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "Email already exists" });
    }

    // Check if password is correct
    await bcrypt.hash(password, 10, async function (err, hash) {
      console.log(err);

      let newUser = await User.create({
        email,
        password: hash,
      });
      res.status(200).json({ newUser });
    });

    // Send token in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  create product
app.post("/api/products", async (req: Request, res: Response) => {
  const newProduct = new Product();

  const proName = req.body.name;
  const proPrice = req.body.price;
  const proDescription = req.body.description;
  const proImageUrl = req.body.imageUrl;

  newProduct.name = proName;
  newProduct.price = proPrice;
  newProduct.description = proDescription;
  newProduct.imageUrl = proImageUrl;
  await newProduct.save();

  res.json(newProduct);
});

// Get all products
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error in getting products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific product by ID
app.get("/api/products/:productId", async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product by ID
app.delete("/api/products/:productId", async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a product by ID
app.put("/api/products/:productId", async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    const id = req.params.productId;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("I am listening in port 3000");
});
