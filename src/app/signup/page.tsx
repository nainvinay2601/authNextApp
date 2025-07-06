"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  // state to hold info about user

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  // just add some classes based on button state
  const [buttonDisabled, setButtonDisabled] = useState(false);

  ///loading text
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // async function to set the user info to

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user); // the user is the data filled in the form so post this data of user to this api route
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: unknown) {
      console.error("Signup Failed", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col">
        <h1 className="mb-4 text-3xl font-bold">
          {loading ? "Processing" : "Signup"}
        </h1>

        {/* input fields */}
        <label htmlFor="username">Username</label>
        <input
          className="bg-white/80 text-black border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-100"
          type="text"
          id="username"
          value={user.username}
          /*Creates a new object by copying all existing properties from user (...user).Updates only the username property with the new value.*/
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
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
          onClick={onSignup}
          className="py-2 px-6  mt-3 border   bg-blue-600 rounded-lg mb-4  border-none outline-none    hover:bg-blue-700"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <p>
          Account already exist?{"    "}
          <Link href="/login">
            <span className="text-blue-500 hover:underline  ">Login Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
