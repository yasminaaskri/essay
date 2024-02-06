"use client";

import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/userSlice";


interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const items = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-between bg-purple-500 p-4 text-white">
      <span className="text-xl font-bold">MyShop</span>
      <div className="flex space-x-4 items-center">
        <Link href="/" passHref>
          <div className="navLink font-bold cursor-pointer">Home</div>
        </Link>
        <Link href="/cart" passHref>
          <div className="navLink font-bold cursor-pointer flex items-center">
            Cart
          </div>
        </Link>
        {!user?.email ? (
          <Link href="/sign-in" passHref>
            <div className="navLink font-bold cursor-pointer flex items-center ">
              SIGN IN
            </div>
          </Link>
        ) : (
          <div
            className="navLink font-bold cursor-pointer flex items-center"
            onClick={handleLogout}
          >
            LOGOUT
          </div>
        )}

        {items.length ? (
          <span className="font-bold">Items: {items.length}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
