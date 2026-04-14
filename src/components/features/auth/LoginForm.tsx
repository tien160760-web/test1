"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu!');
      } else {
        router.push('/game');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-amber-50 border-2 border-amber-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-amber-900">Đăng nhập Làng Việt</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
          {Array.isArray(error) ? error.join(', ') : error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Email</label>
        <input 
          type="email"
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
        disabled={isLoading}
        className="mt-2 bg-amber-700 text-white font-bold py-2 px-4 rounded hover:bg-amber-800 transition shadow-md disabled:opacity-50"
      >
        {isLoading ? 'Đang xử lý...' : 'Vào Làng'}
      </button>
    </form>
  );
}