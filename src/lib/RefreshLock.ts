import { JWT } from "next-auth/jwt";
import { refreshAccessToken } from "./Refresh";

let isRefreshing = false;
let refreshPromise: Promise<JWT> | null = null;

export async function refreshWithLock(token: JWT): Promise<JWT> {
    // Nếu đang có request refresh rồi thì chờ xài chung kết quả đó
    if (isRefreshing && refreshPromise) {
        return await refreshPromise;
    }

    // Chưa có ai refresh → mình làm, các request sau dùng chung promise này
    isRefreshing = true;
    refreshPromise = refreshAccessToken(token)
        .then(refreshed => ({ ...token, ...refreshed, error: undefined }))
        .catch(() => ({ ...token, error: "RefreshAccessTokenError" } as JWT))
        .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
        });

    return await refreshPromise;
}