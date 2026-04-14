import RegisterForm from "@/src/components/features/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"; 
import Link from "next/link";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-center">Tạo tài khoản</h1>
        
        {/* Nhúng Component giao diện vào đây */}
        <RegisterForm />
        
        <p className="mt-4 text-center text-sm">
          Đã có tài khoản? <Link href="/login" className="text-blue-600">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}