"use client";

import React from 'react';
import { GameCard } from '@/types/game';

interface CardProps {
  card: GameCard;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

export default function Card({ card, onDragStart }: CardProps) {
  // Tùy chỉnh màu sắc dựa trên loại thẻ bài
  const getCardColor = (type: string) => {
    switch (type) {
      case 'villager': return 'bg-yellow-100 border-yellow-600';
      case 'resource': return 'bg-green-100 border-green-700';
      case 'building': return 'bg-orange-100 border-orange-800';
      case 'food': return 'bg-red-100 border-red-500';
      default: return 'bg-gray-100 border-gray-400';
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className={`absolute w-24 h-32 rounded-lg border-2 shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-2 user-select-none transition-transform hover:scale-105 ${getCardColor(card.type)}`}
      style={{
        left: `${card.position.x}px`,
        top: `${card.position.y}px`,
      }}
    >
      <h3 className="font-bold text-sm text-center text-gray-800">{card.name}</h3>
      {card.description && (
        <p className="text-xs text-center text-gray-600 mt-2">{card.description}</p>
      )}
    </div>
  );
}