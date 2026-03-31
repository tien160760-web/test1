// Định nghĩa kiểu dữ liệu (bạn có thể đưa ra file src/types/auth.d.ts sau này)
interface RegisterParams {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export const authService = {
    // Gọi API Backend để đăng ký
    async register(data: RegisterParams) {
        const res = await fetch(`http://localhost:3001/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (!res.ok) {
            console.log(result.message);
            throw new Error("Đăng ký thất bại himar");
        }
        return result;
    }

    // Lưu ý: Hàm Login không nằm ở đây vì nó được xử lý ngầm bên trong cấu hình NextAuth (authorize callback) mà chúng ta đã làm ở bài trước!
};