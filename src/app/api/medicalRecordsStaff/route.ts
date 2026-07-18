import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users, medicalRecordsStaff } from "@/db/schema";

export async function POST(req: Request) {
  const body = await req.json();

  // Step 1 — สร้าง user ก่อน
  await db.insert(users).values({
    userId: body.userId,
    roleId: "R003",        // roleId ของนักเวชระเบียน
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

  // Step 2 — สร้าง medicalRecordsStaff ที่ผูกกับ user
  await db.insert(medicalRecordsStaff).values({
    medicalRecordsStaffId: body.medicalRecordsStaffId,
    userId: body.userId,
  });

  return NextResponse.json({ message: "เพิ่มนักเวชระเบียนสำเร็จ" }, { status: 201 });
}