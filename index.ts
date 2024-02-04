import express, { Request, Response } from 'express';

import mongoose from 'mongoose';


import Product from './models/Product';


const app = express();




mongoose.connect("mongodb+srv://yasmine:1234@cluster0.yguhmob.mongodb.net/?retryWrites=true&w=majority"


).then(() => {
    console.log("connected successfully");
})
.catch((error) => {
    console.log("error with connecting with the DB ", error);
});





app.use(express.json());






//  create product 
app.post("/api/products" , async (req:Request , res : Response)=>{
    const newProduct = new Product();

    const proName= req.body.name;
    const proPrice = req.body.price;
    const proDescription = req.body.description


    newProduct.name = proName;
    newProduct.price=proPrice;
    newProduct.description = proDescription ;
   await newProduct.save();
   
   res.json(newProduct);


})

// Get all products
app.get('/api/products', async (req:Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error('Error in getting products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      
    }
  });




  // Get a specific product by ID
app.get('/api/products/:productId', async (req: Request, res: Response) => {
    try {
      const id =req.params.productId
      const product = await Product.findById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });





  // Delete a product by ID
  app.delete('/api/products/:productId', async (req: Request, res: Response) => {
    try {
        const id =req.params.productId
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Update a product by ID
app.put('/api/products/:productId', async (req: Request, res: Response) => {
    try {
      const { name, price , description} = req.body;
      const id = req.params.productId
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price , description},
        { new: true } 
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });





app.listen(3000, () => {
	console.log("I am listening in port 3000");
});