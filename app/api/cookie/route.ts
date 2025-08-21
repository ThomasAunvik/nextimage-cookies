import { NextResponse } from "next/server";

// Update a cookie value
export async function GET() {
  // Set default cookie options if not provided
  const response = NextResponse.json({ message: "Cookie updated" });
  response.cookies.set("session_token", "value", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
