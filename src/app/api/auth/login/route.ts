import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    // TODO:
    // 1. ค้นหา user จาก database
    // 2. ตรวจ password
    // 3. ส่ง role กลับ

    return NextResponse.json({
      message: "Login API works",
      email,
    });

  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}