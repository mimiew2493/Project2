import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await db.query.users.findFirst({
    where: (u, { eq, and }) =>
      and(eq(u.username, username), eq(u.password, password)),
    with: { role: true },
  });

  if (!user) {
    // เดิมส่ง { error: "..." } แต่ฟอร์มหา data.message
    // เลยต้องเปลี่ยนเป็น message และเพิ่ม success: false
    return NextResponse.json(
      { success: false, message: "ไม่พบผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง" },
      { status: 401 },
    );
  }

  // เดิมส่ง user object เปล่า ๆ กลับไป แต่ฟอร์มเช็ค data.success ก่อน
  // ถ้าไม่มี success: true ฟอร์มจะขึ้น error ทั้งที่ login ผ่านจริง
  return NextResponse.json({
    success: true,
    message: "เข้าสู่ระบบสำเร็จ",
    user,
  });
}
