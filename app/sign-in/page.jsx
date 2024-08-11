"use client";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth, provider } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      console.log({ res });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const goToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex-col">
        <h1 className="text-4xl mb-12 font-bold text-white mb-6 text-center">
          HelpAI
        </h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Sign In
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
            onClick={handleSignIn}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white p-3 mt-4 rounded hover:bg-red-600 transition duration-200"
          >
            Sign In with Google
          </button>
          <button
            onClick={goToSignUp}
            className="w-full my-3 text-white hover:text-blue-500 transition duration-500"
          >
            Sign-Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
