import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// 1. Mở rộng interface của next-auth
declare module "next-auth" {

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiredTime?: number;
  }

  interface Session {
    token: JWT;
    error?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {

  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiredTime: number;
    error?: string;
  }
}

declare module "jwt-decode" {
  interface JwtPayload {
    userId: string;
    email: string;
    username: string;
    exp: number;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    refreshToken: string;
    error?: string;
  }
}