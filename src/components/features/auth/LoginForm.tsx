"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';

export default function LoginForm() {
  const router = useRouter();
  // 1. Đổi state username thành email
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 2. Gửi đúng trường "email" sang cho NestJS
      const response = await apiClient.post('/auth/login', {
        email, 
        password,
      });

      //const token = response.data.access_token || response.data.token;
      const token = response.data.accessToken;

      if (token) {
        localStorage.setItem('jwt_token', token);
        router.push('/game');
      } else {
        setError('Không nhận được token từ server.');
      }
    } catch (err: any) {
      console.error('Lỗi đăng nhập:', err);
      // Hiển thị lỗi báo về từ NestJS cho người dùng dễ thấy
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-amber-50 border-2 border-amber-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-amber-900">Đăng nhập Làng Việt</h2>
      
      {/* Hiển thị lỗi (nếu có) */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
          {Array.isArray(error) ? error.join(', ') : error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Email</label>
        <input 
          type="email" // 3. Ràng buộc đúng định dạng email ở phía HTML
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nguoichoi@gmail.com"
          className="w-full border-2 border-amber-200 p-2 rounded focus:outline-none focus:border-amber-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Mật khẩu</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border-2 border-amber-200 p-2 rounded focus:outline-none focus:border-amber-600"
          required
        />
      </div>

      <button 
        type="submit" 
        className="mt-2 bg-amber-700 text-white font-bold py-2 px-4 rounded hover:bg-amber-800 transition shadow-md"
      >
        Vào Làng
      </button>
    </form>
  );
}