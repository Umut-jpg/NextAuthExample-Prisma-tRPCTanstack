import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    role: string;
  }
}
