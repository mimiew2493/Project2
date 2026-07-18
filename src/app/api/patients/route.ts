import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { patients } from "@/db/schema/patients";
import { users } from "@/db/schema/users";
import { patientPrograms } from "@/db/schema/patient-programs";
import { programs } from "@/db/schema/programs";
import { eq } from "drizzle-orm";
import { getCorsHeaders } from "@/lib/cors";

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  // 1) ดึงผู้ป่วยทั้งหมด พร้อม join ตาราง users เพื่อเอาชื่อ-นามสกุล
  //    (ตาราง patients เก็บแค่ userId ไว้อ้างอิง ไม่มีชื่อเก็บอยู่เอง)
  const patientRows = await db
    .select({
      patientId: patients.patientId,
      firstName: users.firstName,
      lastName: users.lastName,
      registerDate: patients.registerDate,
    })
    .from(patients)
    .innerJoin(users, eq(patients.userId, users.userId));

  // 2) ดึงข้อมูลโปรแกรมการรักษาทั้งหมด พร้อม join เอาชื่อโปรแกรมจากตาราง programs
  //    หนึ่ง patientId อาจมีได้หลายแถว (เคยได้รับหลายโปรแกรมตามช่วงเวลา)
  const programRows = await db
    .select({
      patientId: patientPrograms.patientId,
      programName: programs.programName,
      status: patientPrograms.status,
      startDate: patientPrograms.startDate,
      assignedDate: patientPrograms.assignedDate,
    })
    .from(patientPrograms)
    .innerJoin(programs, eq(patientPrograms.programId, programs.programId));

  // 3) เก็บเฉพาะโปรแกรม "ล่าสุด" ของผู้ป่วยแต่ละคน โดยเทียบจาก startDate
  //    (ถ้าไม่มี startDate ใช้ assignedDate แทน)
  const latestProgramByPatient = new Map<string, (typeof programRows)[number]>();
  for (const row of programRows) {
    const rowDate = row.startDate ?? row.assignedDate ?? "";
    const existing = latestProgramByPatient.get(row.patientId);
    const existingDate = existing?.startDate ?? existing?.assignedDate ?? "";

    if (!existing || rowDate > existingDate) {
      latestProgramByPatient.set(row.patientId, row);
    }
  }

  // 4) รวมข้อมูลทั้งหมดให้อยู่ใน shape เดียวกับที่หน้า UI (patients.js) ต้องการอยู่แล้ว
  //    เพื่อให้แก้ฝั่ง frontend น้อยที่สุด
  const result = patientRows.map((p) => ({
    id: p.patientId.slice(0, 2).toUpperCase(), // ใช้ตัวย่อจาก patientId แทน avatar text
    patientId: p.patientId,
    name: `${p.firstName} ${p.lastName}`,
    program: latestProgramByPatient.get(p.patientId)?.programName ?? "ยังไม่มีโปรแกรม",
    date: p.registerDate,
    status: latestProgramByPatient.get(p.patientId)?.status ?? "ไม่มีข้อมูล",
  }));

  return NextResponse.json(
    { success: true, patients: result },
    { headers: corsHeaders }
  );
}