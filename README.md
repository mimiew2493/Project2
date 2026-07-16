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

# Git Commands (Project Workflow)

## 1. ตรวจสอบสถานะไฟล์
```bash
git status
```
> ดูว่าไฟล์ไหนถูกแก้ไข เพิ่ม หรือลบ

---

## 2. ดึงโค้ดล่าสุดจาก GitHub
```bash
git pull
```
> ดึงการเปลี่ยนแปลงล่าสุดจาก Repository ก่อนเริ่มทำงาน

> หากเคยเกิดปัญหา unrelated histories (ใช้ครั้งแรกเท่านั้น)
```bash
git pull origin main --allow-unrelated-histories --no-rebase
```

---

## 3. เพิ่มไฟล์ที่แก้ไข
```bash
git add .
```
> เพิ่มไฟล์ทั้งหมดเข้า Staging Area

หรือเพิ่มเฉพาะไฟล์

```bash
git add src/app/page.tsx
```

---

## 4. Commit การเปลี่ยนแปลง
```bash
git commit -m "Describe your changes"
```

ตัวอย่าง

```bash
git commit -m "Add login page"
git commit -m "Fix sidebar layout"
git commit -m "Update patient dashboard"
```

---

## 5. Push ขึ้น GitHub
```bash
git push
```

> ส่ง Commit ขึ้น GitHub

---

## 6. ตรวจสอบ Remote Repository
```bash
git remote -v
```

> ดูว่าเชื่อมกับ GitHub Repository ไหนอยู่

---

## 7. เปลี่ยน URL ของ Remote
```bash
git remote set-url origin https://github.com/OWNER/REPOSITORY.git
```

---

## 8. ลบ Remote
```bash
git remote remove origin
```

---

## 9. เพิ่ม Remote
```bash
git remote add origin https://github.com/OWNER/REPOSITORY.git
```

---

## 10. ดูประวัติ Commit
```bash
git log --oneline --graph --all --decorate
```

---

# Daily Workflow

```bash
git pull
git status
git add .
git commit -m "Describe your changes"
git push
```

---

# First Time Setup (Only Once)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git branch -M main
git push -u origin main
```

---

# Merge Conflict (README Example)

ใช้ไฟล์ของเครื่องเรา

```bash
git checkout --ours README.md
git add README.md
git commit -m "Merge remote main"
git push
```

ใช้ไฟล์จาก GitHub

```bash
git checkout --theirs README.md
git add README.md
git commit -m "Merge remote main"
git push
```