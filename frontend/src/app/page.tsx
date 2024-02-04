'use client';
// Homepage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/cartSlice';

interface Product {
  id: number; // Make sure to include id in your Product interface
  title: string;
  price: number;
  description: string;
}

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products'); // Update the URL here
      const data = await res.json();
      setProducts(data);
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
        <div key={product.id} className='card'>
         
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button className='btn' onClick={() => handleAdd(product)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
