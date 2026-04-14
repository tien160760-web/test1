"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";


export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Gọi Service để đăng ký
      await authService.register(formData);

      // 2. Thành công thì gọi NextAuth để login luôn
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Tài khoản đã tạo nhưng tự động đăng nhập thất bại.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      {error && <p className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</p>}
      <input 
        type="email" placeholder="Email" required className="border p-2 rounded"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input 
        type="text" placeholder="Username" required className="border p-2 rounded"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input 
        type="password" placeholder="Password" required className="border p-2 rounded"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input 
        type="password" placeholder="Confirm Password" required className="border p-2 rounded"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />
      <button disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 rounded disabled:opacity-50">
        {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
      </button>
    </form>
  );
}