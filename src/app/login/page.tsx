"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!username) {
      setError("กรุณากรอกรหัสผู้ใช้");
      return;
    }

    if (!password) {
      setError("กรุณากรอกรหัสผ่าน");
      return;
    }

    if (password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        toast.error(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("username", username);
      } else {
        localStorage.removeItem("username");
      }

      toast.success(data.message || "เข้าสู่ระบบสำเร็จ");

      // ถ้าจะเก็บข้อมูลผู้ใช้ไว้ฝั่ง Client
      localStorage.setItem("user", JSON.stringify(data.user));

      // เปลี่ยนภายหลังเป็นแยกตาม Role ได้
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      toast.error("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
      flex min-h-screen
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-100
      to-blue-200
      px-4
      "
    >
      <Card
        className="
        w-full
        max-w-md
        "
      >
        <CardHeader className="text-center">
          <div
            className="
            text-3xl
            "
          >
            logo
          </div>

          <CardTitle
            className="
            text-2xl
            text-black-600
            "
          >
            ระบบฟื้นฟู ALS
          </CardTitle>

          <CardDescription>พยุงมือที่เคลื่อนไหว สร้างความหวัง</CardDescription>
        </CardHeader>

        <CardContent>
          <h2
            className="
            mb-6
            text-center
            text-xl
            font-semibold
            "
          >
            ยินดีต้อนรับกลับมา
          </h2>

          <form
            onSubmit={handleSubmit}
            className="
            space-y-4
            "
          >
            <Input
              placeholder="เช่น patientxx"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div
              className="
              relative
              "
            >
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                absolute
                right-3
                top-2.5
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <p
                className="
                text-sm
                text-red-500
                "
              >
                {error}
              </p>
            )}

            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(value) => setRememberMe(Boolean(value))}
              />

              <span>จำรหัสผ่าน</span>
            </div>

            <Button
              type="submit"
              className="
              w-full
              "
              disabled={loading}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>

            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="
              w-full
              text-sm
              text-blue-600
              "
            >
              ลืมรหัสผ่าน?
            </button>
          </form>

          <div
            className="
            mt-6
            border-t
            pt-4
            text-center
            text-sm
            text-gray-500
            "
          >
            ปัญหาในการเข้าสู่ระบบ?
            <span
              className="
              ml-1
              text-blue-600
              "
            >
              ติดต่อเจ้าหน้าที่
            </span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ลืมรหัสผ่าน</DialogTitle>

            <DialogDescription>
              กรุณากรอกรหัสผู้ใช้ เพื่อรีเซ็ตรหัสผ่าน
            </DialogDescription>
          </DialogHeader>

          <Input placeholder="รหัสผู้ใช้" />

          <Button>ส่งลิงค์รีเซ็ต</Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
