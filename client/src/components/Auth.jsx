import React from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome to Our App</h1>

      <SignedOut>
        <div className="flex gap-4">
          <SignIn />
          <SignUp />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="text-center">
          <h2 className="text-lg font-semibold">You are signed in!</h2>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Auth;
