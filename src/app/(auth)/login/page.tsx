import Link from 'next/link';

// Định nghĩa phông chữ serif cho tiêu đề
import { Playfair_Display } from 'next/font/google';

// Định nghĩa phông chữ sans-serif cho phần còn lại
import { Inter } from 'next/font/google';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function LoginPage() {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-green-100 ${inter.className}`}>
      {/* Container của form đăng nhập */}
      <div className="bg-white p-12 rounded-2xl shadow-xl border border-amber-100 w-[450px]">
        
        {/* Tiêu đề chính */}
        <div className="text-center mb-8">
          <h1 className={`${playfairDisplay.className} text-4xl font-bold text-amber-900 uppercase tracking-wider mb-2`}>
            Làng Việt
          </h1>
          <h2 className="text-lg font-medium text-green-700 uppercase tracking-wide">
            Đăng nhập
          </h2>
       </div>

        {/* Biểu mẫu đăng nhập */}
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-amber-800">
              Tên nông dân
            </label>
            <div className="mt-1 relative">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none block w-full px-4 py-3 bg-yellow-50/50 border border-amber-200 rounded-xl shadow-sm placeholder-amber-300 text-amber-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-amber-800">
              Mật khẩu
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-4 py-3 bg-yellow-50/50 border border-amber-200 rounded-xl shadow-sm placeholder-amber-300 text-amber-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Bắt đầu khởi nghiệp
            </button>
          </div>
        </form>

        {/* Chân trang và liên kết đăng ký */}
        <div className="mt-8 text-center text-sm text-amber-700">
          Chưa có thẻ bài?{" "}
          <Link href="/register" className="font-bold text-green-700 hover:text-green-800 hover:underline transition-colors">
            Hãy đăng ký để nhận 50 vàng!
          </Link>
        </div>
      </div>
    </div>
  );
}