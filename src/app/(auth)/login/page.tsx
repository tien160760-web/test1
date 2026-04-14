// quy ước @ là alias trỏ đến thư mục src/ của dự án Next.js
import LoginForm from "@/components/features/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function LoginPage() {
  // Gác cổng: Đã đăng nhập rồi thì đá sang trang Dashboard
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-center">Đăng nhập hệ thống</h1>
        
        {/* Nhúng Component giao diện vào đây */}
        <LoginForm />

        <p className="mt-4 text-center text-sm">
          Chưa có tài khoản? <Link href="/register" className="text-blue-600">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}