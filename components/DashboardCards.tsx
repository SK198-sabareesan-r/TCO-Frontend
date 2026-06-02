'use client';

import { useEffect, useState } from 'react';

interface CardData {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

export default function DashboardCards() {
  const [cards] = useState<CardData[]>([
    {
      title: 'Current Monthly Cost',
      value: '$45,280',
      change: 'Azure + GCP',
      icon: '💵',
      color: 'bg-gray-100',
    },
    {
      title: 'AWS OnDemand Cost',
      value: '$38,450',
      change: '-15% vs current',
      icon: '☁️',
      color: 'bg-ice-100',
    },
    {
      title: 'Optimized Cost',
      value: '$18,120',
      change: 'With Savings Plans',
      icon: '✨',
      color: 'bg-savings-green/10',
    },
    {
      title: 'Total Savings',
      value: '60%',
      change: '$27,160/month',
      icon: '🎯',
      color: 'bg-savings-green/20',
    },
  ]);

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`glass-effect p-6 rounded-2xl border border-ice-200 hover-glow cursor-pointer transition-all ${
            animated ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-2xl`}>
              {card.icon}
            </div>
          </div>
          <h3 className="text-sm text-gray-600 mb-2">{card.title}</h3>
          <div className="text-3xl font-bold text-navy-dark mb-1">
            {card.value}
          </div>
          <div className={`text-sm ${card.title === 'Total Savings' ? 'text-savings-green font-semibold' : 'text-gray-500'}`}>
            {card.change}
          </div>
        </div>
      ))}
    </div>
  );
}
