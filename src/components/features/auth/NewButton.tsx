'use client'

import { useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { refreshAccessToken } from "@/src/lib/Refresh";

export default function UserApiCaller() {
    const { data: session } = useSession();
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callNestApi = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/user-proxy", {
                method: "GET",
                // cache: 'no-store' // Đảm bảo luôn lấy dữ liệu mới nhất nếu cần
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            console.log("Phản hồi từ API Proxy:", data);
            setResult(data.id);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
            setError("Không thể kết nối với máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    const callRefreshToken = async () => {
        setLoading(true);
        try {
            const newSession = await getSession();
            if (newSession && (newSession as any).error !== "RefreshAccessTokenError") {
                setError(null);
                refreshAccessToken(newSession.token.refreshToken);
                callNestApi();
            } else {
                setError("Phiên đăng nhập đã hết hạn. Đang chuyển hướng...");
                console.log('Phiên đăng nhập đã hết hạn. Đang chuyển hướng...himar');
                setTimeout(() => signOut({ callbackUrl: '/login' }), 2000);
            }
        } catch (error) {
            console.error("Lỗi làm mới phiên:", error);
            setError("Không thể làm mới phiên. Vui lòng đăng nhập lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-blue-500"></span>
                Thử nghiệm API nội bộ
            </h3>

            <div className="space-y-4">
                <button
                    onClick={callRefreshToken}
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white shadow-md transition-all active:scale-95
            ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang truy vấn...
                        </span>
                    ) : "Lấy ID từ Backend"}
                </button>

                {/* Hiển thị kết quả */}
                {result && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Phản hồi từ NestJS:</p>
                        <p className="font-mono text-green-700 break-all mt-1">{result}</p>
                    </div>
                )}

                {/* Hiển thị lỗi */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">❌ {error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
