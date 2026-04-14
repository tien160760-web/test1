"use client";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
export default function LogoutButton() {

    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = async () => {
        const session = await getSession();
        setIsLoading(true);


        try {
            await fetch(`http://localhost:3001/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.token.accessToken}`
                },
                body: JSON.stringify({
                    refreshToken: session?.token.refreshToken, 
                }),
            });
        } catch (error) {
            console.error("Lỗi gọi API Logout backend nhưng vẫn sẽ logout ở frontend");
        }

        console.log('đang logout');
        signOut({ callbackUrl: "/login" });
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleLogout} 
            disabled={isLoading}  
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm
                ${isLoading 
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none" 
                    : "bg-red-50 text-red-700 hover:bg-red-600 hover:text-white active:scale-95 shadow-red-100" 
                }`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Đang xử lý...</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span>Đăng xuất</span>
                </>
            )}
        </button>
    );
}