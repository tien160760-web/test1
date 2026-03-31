import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    console.log("Token lỗi");
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  try {
    // 2. Gọi sang NestJS (Server-to-Server)
    const nestApiUrl = `http://localhost:3001/users/oi`;
    console.log("token ngon", token);
    const response = await fetch(nestApiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    console.log("Phản hồi từ NestJS:", data); // Log chi tiết phản hồi từ NestJS
    if (!response.ok) {
      console.log("Token ngon nhưng lỗi nest", response.status);
      return NextResponse.json(
        { error: "Lỗi từ phía NestJS Server" },
        { status: response.status }
      );
    }
    return NextResponse.json({ id: data });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}