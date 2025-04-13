"use client";
import { FC, ReactNode } from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";
interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: ROUTES.ROOT,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Error signing in with Google. Please try again.");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  };

  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
    >
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
