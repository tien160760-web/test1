import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.error === "RefreshAccessTokenError") {
    return NextResponse.json({ error: "RefreshAccessTokenError" }, { status: 401 });
  }

  try {
    // 2. Gọi sang NestJS (Server-to-Server)
    // console.log("token ngon", token);
    const response = await fetch('http://localhost:3001/users/oi', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // console.log("Token ngon nhưng lỗi nest", response.status);
      const error = await response.json().catch(() => ({ message: "NestJS error" }));
      return NextResponse.json(
        { error: error.message ?? "Unknown error" },
        { status: response.status }
      );
    }

    const data = await response.text();
    // console.log("Phản hồi từ NestJS:", data); // Log chi tiết phản hồi từ NestJS
    return NextResponse.json({ id: data });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}