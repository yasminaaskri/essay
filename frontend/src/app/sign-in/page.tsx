"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function ArpansForm() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state: any) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function woosalSubmit(data: { email: string; password: string }) {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }); // Update the URL here
      const user = await res.json();
      dispatch(login(user));
    } catch (error) {
      setErrorMessage(error as string);
      console.error("Error fetching products:", error);
    }
  }

  console.log(user);

  if (user.token) return redirect("/");

  return (
    <div>
      <form onSubmit={handleSubmit(woosalSubmit)}>
        {errorMessage && <div>{JSON.stringify(errorMessage)}</div>}
        <div className="mb-8">
          <label
            htmlFor="email"
            className={`block font-bold text-sm mb-2 ${
              errors.email ? "text-red-400" : "text-purple-400"
            }`}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="hey@chrisoncode.io"
            className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
              errors.email
                ? "text-red-300 border-red-400"
                : "text-purple-200 border-purple-400"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              A valid email is required.
            </p>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className={`block font-bold text-sm mb-2 ${
              errors.password ? "text-red-400" : "text-purple-400"
            }`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="superduperpassword"
            className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-purple-200 focus:bg-purple-600 placeholder-purple-500 ${
              errors.password ? "border-red-400" : "border-purple-400"
            }`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              Your password is required.
            </p>
          )}
        </div>

        <button className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm">
          Submit
        </button>
      </form>
    </div>
  );
}
