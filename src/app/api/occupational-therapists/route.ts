import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users, occupationalTherapists } from "@/db/schema";

export async function GET() {
  const otList = await db.query.occupationalTherapists.findMany({
    with: { user: true },
  });

  return NextResponse.json(otList);
}
export async function POST(req: Request) {
  const body = await req.json();

  // Step 1 — สร้าง user ก่อน
  await db.insert(users).values({
    userId: body.userId,
    roleId: "R002",        // roleId ของ OT (แล้วแต่ที่กำหนดไว้)
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone,
    email: body.email,
    gender: body.gender,
    birthDate: body.birthDate,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
await db.insert(occupationalTherapists).values({
    otId: body.otId,
    userId: body.userId,
    licenseNumber: body.licenseNumber,
  });

  return NextResponse.json({ message: "เพิ่มนักกายภาพสำเร็จ" }, { status: 201 });
}