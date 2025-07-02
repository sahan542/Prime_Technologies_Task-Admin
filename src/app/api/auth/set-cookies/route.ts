import { authKey } from "@/constants/authKey";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json();

  if (!accessToken) {
    return NextResponse.json({ message: "Token not found!" }, { status: 400 });
  }

  const response = NextResponse.json(
    { message: "Cookie set" },
    { status: 200 }
  );

  // ✅ Set cookie via response
  response.cookies.set(authKey, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
