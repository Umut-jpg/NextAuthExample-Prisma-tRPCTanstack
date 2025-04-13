"use client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { signOut } from "next-auth/react";
import React from "react";

const UserNavbar = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/${ROUTES.AUTH.LOGIN}`,
          redirect: true,
        })
      }
      variant="destructive"
    >
      Sign out
    </Button>
  );
};

export default UserNavbar;
