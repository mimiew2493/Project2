This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev # Use this one
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

## DB:USER postgres WITH PASSWORD 'project67';

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Git Workflow

## Branch

- `main` : Branch หลัก เก็บเวอร์ชันที่พร้อมใช้งาน
- `dev` : Branch สำหรับพัฒนา แก้ไข และเพิ่ม Feature ก่อนรวมเข้า main

Flow:

```
dev (พัฒนา)
   ↓
Commit + Push
   ↓
Review / ตรวจสอบ
   ↓
Merge เข้า main
   ↓
main (เวอร์ชันหลัก)
```

---

# 1. การอัปเดตโค้ดขึ้น GitHub

ใช้หลังจากแก้ไขโค้ดเสร็จแล้ว

```bash
git status
```

ตรวจสอบไฟล์ที่มีการเปลี่ยนแปลง

```bash
git add .
```

เพิ่มไฟล์ที่ต้องการบันทึก

```bash
git commit -m "Describe changes"
```

บันทึกการเปลี่ยนแปลง

```bash
git push
```

อัปโหลด Commit ขึ้น GitHub

ตัวอย่าง:

```bash
git add .
git commit -m "Add login page"
git push
```

---

# 2. การรวม dev เข้า main (Merge)

เมื่อพัฒนาใน `dev` เสร็จ และต้องการรวมเข้า `main`

## ขั้นตอน

### 1. เปลี่ยนไปที่ main

```bash
git checkout main
```

### 2. ดึงโค้ดล่าสุดจาก GitHub

```bash
git pull
```

### 3. รวมโค้ดจาก dev

```bash
git merge dev
```

### 4. อัปโหลด main ที่รวมแล้วขึ้น GitHub

```bash
git push
```

---

# สรุปการทำงานทั้งหมด

## ทำงานประจำวัน (อยู่บน dev)

```
แก้โค้ด
 ↓
git status
 ↓
git add .
 ↓
git commit -m "รายละเอียดที่แก้"
 ↓
git push
```

---

## เมื่อต้องการรวมงานเข้า main

```
dev เสร็จ
 ↓
git checkout main
 ↓
git pull
 ↓
git merge dev
 ↓
git push
 ↓
main อัปเดตแล้ว
```
