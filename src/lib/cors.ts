// รายชื่อ origin ที่อนุญาตให้เรียก API นี้ได้ (ต้องระบุตรง ๆ ห้ามใช้ "*"
// เพราะเราส่ง cookie ข้าม origin ด้วย credentials: 'include' ฝั่ง client
// Wildcard "*" ใช้ร่วมกับ credentials ไม่ได้ตาม spec ของ browser)
const ALLOWED_ORIGINS = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

/**
 * คืนค่า CORS headers ที่เหมาะกับ origin ของ request นั้น ๆ
 * ถ้า origin ที่ส่งมาไม่อยู่ใน allow list จะไม่ตั้งค่า Access-Control-Allow-Origin
 * ซึ่งจะทำให้ browser ฝั่งนั้นบล็อก request เอง
 */
export function getCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Credentials": "true", // อนุญาตให้แนบ cookie มาด้วยได้
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}