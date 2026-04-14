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
    const response = await fetch('http://localhost:3001/users/oi', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "NestJS error" }));
      return NextResponse.json(
        { error: error.message ?? "Unknown error" },
        { status: response.status }
      );
    }

    const data = await response.text();
    return NextResponse.json({ id: data });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}