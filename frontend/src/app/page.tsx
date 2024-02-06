'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/cartSlice';

interface Product {
  _id: string; // Make sure to include id in your Product interface
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products'); 
      const data = await res.json();
      setProducts(data);
      // console.log(data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = (product: Product) => {
    dispatch(add(product));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='productsWrapper'>
      {products.map((product) => (
         <div key={product._id} className='card'>
         <img src={`http://localhost:3000/images/${product.imageUrl}`} alt={product.name} />

          <h4> <strong>{product.name}</strong></h4>
          <h5><strong><mark>{product.price}</mark></strong></h5>
          <h5>{product.description}</h5>
          <button className='btn' onClick={() => handleAdd(product)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
