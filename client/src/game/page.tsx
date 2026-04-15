"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Card from '@/components/game/Card'; 
import { getSocket } from '@/services/socket';
import { GameCard } from '@/types/game';

export default function GameBoard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cards, setCards] = useState<GameCard[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Chờ NextAuth xác định trạng thái xong mới xử lý
    if (status === 'loading') return;

    // Chưa đăng nhập thì đá về login
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Khởi tạo Socket
    const socket = getSocket(session?.token?.accessToken);
    socket.connect();

    // Lắng nghe dữ liệu
    socket.on('board_update', (updatedCards: GameCard[]) => {
      setCards(updatedCards);
    });

    socket.on('card_moved', (data: { cardId: string, x: number, y: number }) => {
      setCards((prev) => 
        prev.map(c => c.id === data.cardId ? { ...c, position: { x: data.x, y: data.y } } : c)
      );
    });

    return () => {
      socket.off('board_update');
      socket.off('card_moved');
      socket.disconnect();
    };
  }, [status, session, router]);

  // Đang kiểm tra session thì hiển thị loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#f4e4bc] flex items-center justify-center">
        <p className="text-amber-900 text-lg font-semibold">Đang tải bàn chơi...</p>
      </div>
    );
  }

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('cardId', cardId);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    e.dataTransfer.setData('offsetX', (e.clientX - rect.left).toString());
    e.dataTransfer.setData('offsetY', (e.clientY - rect.top).toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!boardRef.current) return;

    const cardId = e.dataTransfer.getData('cardId');
    const offsetX = parseInt(e.dataTransfer.getData('offsetX'), 10);
    const offsetY = parseInt(e.dataTransfer.getData('offsetY'), 10);

    const boardRect = boardRef.current.getBoundingClientRect();
    let newX = e.clientX - boardRect.left - offsetX;
    let newY = e.clientY - boardRect.top - offsetY;

    newX = Math.max(0, newX);
    newY = Math.max(0, newY);

    setCards((prev) => 
      prev.map(c => c.id === cardId ? { ...c, position: { x: newX, y: newY } } : c)
    );

    const socket = getSocket(session?.token?.accessToken);
    socket.emit('move_card', { cardId, x: newX, y: newY });
  };

  return (
    <div className="min-h-screen bg-[#f4e4bc] p-4 flex flex-col">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Làng Việt - Bàn Chơi Co-op</h1>
        <div className="text-sm text-amber-800">Cùng nhau xây dựng bản làng</div>
      </header>

      <main 
        ref={boardRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 relative bg-[url('/textures/wood-bg.jpg')] bg-amber-100 bg-cover bg-center rounded-xl shadow-inner border-4 border-amber-800 overflow-hidden"
      >
        {cards.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-amber-900/50">
            Chưa có thẻ bài nào trên bàn
          </div>
        )}
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            onDragStart={handleDragStart} 
          />
        ))}
      </main>
    </div>
  );
}