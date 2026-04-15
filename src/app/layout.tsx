import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Đã sửa lại đường dẫn chuẩn xác dùng Alias @/ trỏ vào thư mục features
import { NextAuthProvider } from "@/components/features/providers/NextAuthProvider";
import Navbar from "@/components/features/navbar/Navbar";

// Dùng font Inter thay cho Geist để tránh lỗi phiên bản Next.js
const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Làng Việt - Game Thẻ Bài Chiến Thuật",
  description: "Xây dựng và phát triển làng quê Việt Nam qua những thẻ bài độc đáo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}