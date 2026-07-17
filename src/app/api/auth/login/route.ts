import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { username, password } = body;

  return NextResponse.json({
    success: true,
    username,
    password,
  });
}