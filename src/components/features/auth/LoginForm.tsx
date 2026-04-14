"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
        console.log('sai ở đây');
      setError("Sai email hoặc mật khẩu himar!");
      setIsLoading(false);
    } else {
      router.push("/dashboard"); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      {error && <p className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</p>}
      <input 
        type="email" placeholder="Email" required className="border p-2 rounded"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" placeholder="Mật khẩu" required className="border p-2 rounded"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading} type="submit" className="bg-black text-white p-2 rounded disabled:opacity-50">
        {isLoading ? "Đang vào..." : "Đăng nhập"}
      </button>
    </form>
  );
}