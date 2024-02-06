import { Schema, model, Document } from 'mongoose';

interface Product extends Document{
  imageUrl: String,
  name: string;
  price: number;
  description: string;
}

const productSchema = new Schema<Product>({
  imageUrl:String,
  name: String,
  price: Number, 
  description : String,
  
});


const Product = model<Product>('Product', productSchema);


export default Product;