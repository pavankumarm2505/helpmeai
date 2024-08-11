"use client";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth, provider } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      if (!res) {
        alert("User email already exists.");
      } else {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      console.log({ res });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const goToSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex-col">
        <h1 className="text-4xl mb-12 font-bold text-white mb-6 text-center">
          HelpAI
        </h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Sign Up
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white p-3 mt-4 rounded hover:bg-red-600 transition duration-200"
          >
            Sign Up with Google
          </button>
          <button
            onClick={goToSignIn}
            className="w-full my-3 text-white hover:text-blue-500 transition duration-500"
          >
            Sign-In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
