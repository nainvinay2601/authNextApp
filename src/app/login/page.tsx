"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  // state to hold info about user

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // async function to set the user info to

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col">
        <h1 className="mb-4 text-3xl font-bold">Login</h1>

        {/* input fields */}

        <label htmlFor="email">Email</label>
        <input
          className="bg-white/80 text-black border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-100"
          type="email"
          id="email"
          value={user.email}
          /*Creates a new object by copying all existing properties from user (...user).Updates only the email property with the new value.*/
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          className="bg-white/80 text-black border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-100"
          type="password"
          id="password"
          value={user.password}
          /*Creates a new object by copying all existing properties from user (...user).Updates only the password property with the new value.*/
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onLogin}
          className="py-2 px-6  mt-3 border   bg-blue-600 rounded-lg mb-4  border-none outline-none    hover:bg-blue-700"
        >
         Login
        </button>
        <p>
          Account {`doesn't`} exist?{"    "}
          <Link href="/signup">
            <span className="text-blue-500 hover:underline  ">Signup Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
