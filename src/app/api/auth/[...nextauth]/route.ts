import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { refreshWithLock } from "@/lib/RefreshLock";
// Hàm gọi API backend để lấy token mới
// async function refreshAccessToken(token: JWT): Promise<JWT> {
//     try {
//         console.log("token", token);
//         const res = await fetch(`http://localhost:3001/auth/refresh`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ refreshToken: token.refreshToken }),
//         });

//         const refreshedTokens = await res.json();
//         if (!res.ok) {
//             console.log("chịu luôn");
//             throw refreshedTokens;
//         }

//         return refreshedTokens.accessToken;
//         // accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000, // Ví dụ backend trả về số giây
//         //   refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fallback lại token cũ nếu backend không trả về refresh token mới
//     } catch (error) {
//         console.error("Lỗi refresh token", error);
//         return {
//             ...token,
//             error: "RefreshAccessTokenError",
//         };
//     }
// }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Gọi API Login của backend
                const res = await fetch(`http://localhost:3001/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });
                // console.log('res', res); // lần 
                const token = await res.json();
                // console.log('provider', token); // lần 2: có exp định nghĩa từ backend
                // Nếu login thành công backend trả về token
                const decoded = jwtDecode<JwtPayload>(token.accessToken);
                // console.log('return: {', 'decode id', decoded, 'token', token, '}'); // lần 3
                if (res.ok && token) {

                    // Object trả về ở đây sẽ được truyền vào JWT callback phía dưới
                    return {
                        id: decoded.userId,
                        email: decoded.email,
                        name: decoded.username,
                        accessToken: token.accessToken,
                        refreshToken: token.refreshToken,
                        expiredTime: decoded.exp ? decoded.exp * 1000 : 0,
                    };
                }
                // Trả về null sẽ hất user ra trang lỗi
                return null;
            }
        })
    ],
    callbacks: {
        // 2. Xử lý JWT (Lưu token vào Cookie được mã hóa)
        async jwt({ token, user }) {
            // console.log('user', user) // lần 4: tất cả thằng nào return ở trên thì vào user hết
            // console.log('token', token)
            // Initial sign in: user chỉ có dữ liệu ở lần đăng nhập đầu tiên
            if (user) {
                token.id = user.id;
                token.email = user.email;
                // token.username = user.name;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expiredTime = user.expiredTime ? user.expiredTime : 0;
                // console.log("JWT callback", { token, user }); //lần 5: đang bị trùng token.name và username (tức là có 2 fields)
                return token;

            }

            // console.log('token.expiredTime', token.expiredTime);
            if (Date.now() > token.expiredTime) {
                console.log("chuẩn bị gọi refresh");
                try {
                    const refreshed = await refreshWithLock(token);
                    return {
                        ...token,
                        ...refreshed,
                        error: undefined,
                    };
                } catch (error) {
                    return {
                        ...token,
                        error: "Failed to refresh access token",
                    };
                }
            }
            console.log("token bình thường", token);
            return {
                ...token,
                error: undefined,
            }
        },

        // 3. Xử lý Session (Đẩy data từ JWT ra Client)
        async session({ session, token }) {
            session.user = {
                id: token.id,
                email: token.email,
                name: token.username as string,
            };
            session.token = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
            session.error = token.error;
            console.log("session bình thường", session);
            return session;
        }
    },
    pages: {
        signIn: '/login', // Đường dẫn trang login custom của bạn
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 60 // 
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };