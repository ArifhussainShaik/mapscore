/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import config from "@/config";

// Sign-in button that adapts based on auth state.
// If logged in: shows user avatar + link to dashboard.
// If logged out: shows sign-in button.
const ButtonSignin = ({ text = "Get started", extraStyle }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <button className={`btn ${extraStyle ? extraStyle : ""}`} disabled>
        <span className="loading loading-spinner loading-xs"></span>
      </button>
    );
  }

  if (isSignedIn) {
    return (
      <Link
        href={config.auth.callbackUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
            {user?.firstName?.charAt(0) || user?.primaryEmailAddress?.emailAddress?.charAt(0)}
          </span>
        )}
        {user?.firstName || user?.primaryEmailAddress?.emailAddress || "Account"}
      </Link>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className={`btn ${extraStyle ? extraStyle : ""}`}>
        {text}
      </button>
    </SignInButton>
  );
};

export default ButtonSignin;
