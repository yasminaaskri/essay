"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/cartSlice";

// Define the interface for the props
interface CartPageProps {}

// Define the interface for the item in the cart
interface CartItem {
  ref: string;
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const CartPage: React.FC<CartPageProps> = () => {
  const dispatch = useDispatch();

  // Assuming the cart slice has a structure like { cart: CartItem[] }
  const cartItems = useSelector((state: { cart: CartItem[] }) => state.cart);

  const handleRemove = (ref: string) => {
    dispatch(remove(ref));
  };

  return (
    <div>
      <div className="cartWrapper">
        {cartItems.map((item) => (
          <div
            key={item.ref}
            className="cartCard flex items-center justify-between"
          >
            <div>
              <img
                src={`http://localhost:3000/images/${item.imageUrl}`}
                alt={item.name}
              />
            </div>
            <div className="flex items-center">
              <div>
                <h5 className="font-bold">{item.name}</h5>
                <h5 className="font-bold">price : {item.price}</h5>
              </div>
            </div>
            <button className="btn ml-2" onClick={() => handleRemove(item.ref)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
