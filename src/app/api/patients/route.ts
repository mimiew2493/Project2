import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users,patients } from "@/db/schema";



export async function GET() {
  const patients = await db.query.patients.findMany({
    with: { user: true },
  });

  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const body = await req.json();await db.insert(users).values({
    userId: body.userId,
    roleId: "R001",        // roleId ของ patient (แล้วแต่ที่กำหนดไว้)
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
  
  await db.insert(patients).values({
    patientId: body.patientId,
    userId: body.userId,
    hospitalNumber: body.hospitalNumber,
    weight: body.weight,
    height: body.height,
    medicalCondition: body.medicalCondition,
    emergencyContactName: body.emergencyContactName,
    emergencyContactPhone: body.emergencyContactPhone,
    registerDate: new Date().toISOString(),
    address: body.address,
  });

  return NextResponse.json({ message: "เพิ่มผู้ป่วยสำเร็จ" }, { status: 201 });
}