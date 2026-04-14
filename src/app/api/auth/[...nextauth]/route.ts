import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { refreshWithLock } from "@/src/lib/auth/RefreshLock";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch(`http://localhost:3001/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });
                const token = await res.json();
                const decoded = jwtDecode<JwtPayload>(token.accessToken);
                if (res.ok && token) {
                    return {
                        id: decoded.userId,
                        email: decoded.email,
                        name: decoded.username,
                        accessToken: token.accessToken,
                        refreshToken: token.refreshToken,
                        expiredTime: decoded.exp ? decoded.exp * 1000 : 0,
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expiredTime = user.expiredTime ? user.expiredTime : 0;
                return token;

            }
            if (Date.now() > token.expiredTime) {
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
            return {
                ...token,
                error: undefined,
            }
        },

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
            return session;
        }
    },
    pages: {
        signIn: '/login', 
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };