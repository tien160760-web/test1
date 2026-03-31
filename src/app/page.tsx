import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  // Lấy thông tin session để biết user đã đăng nhập chưa
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="text-center px-4 max-w-3xl">
        {/* Logo hoặc Icon (Tùy chọn) */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
            <span className="text-white text-3xl font-bold">N</span>
          </div>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Hệ thống <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Next.js Pro</span>
        </h1>
        
        {/* Mô tả */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nền tảng tuyệt vời được xây dựng với Next.js 14, TailwindCSS và NextAuth. 
          Bảo mật cao, tốc độ nhanh chóng và trải nghiệm mượt mà.
        </p>

        {/* Khối Nút bấm (Buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {session ? (
            // NẾU ĐÃ ĐĂNG NHẬP
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Vào Dashboard của bạn
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            // NẾU CHƯA ĐĂNG NHẬP
            <>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-semibold rounded-full shadow-sm hover:shadow-md transition-all"
              >
                Tạo tài khoản mới
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Footer nhỏ */}
      <div className="absolute bottom-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} Bản quyền thuộc về Bạn.
      </div>
    </div>
  );
}