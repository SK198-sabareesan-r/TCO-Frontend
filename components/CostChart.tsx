'use client';

import { useEffect, useState } from 'react';

export default function CostChart() {
  const [animated, setAnimated] = useState(false);

  const data = [
    { label: 'Current Cost', value: 45280, color: 'bg-gray-400', percentage: 100 },
    { label: 'AWS OnDemand', value: 38450, color: 'bg-ice-400', percentage: 85 },
    { label: 'Optimized', value: 18120, color: 'bg-savings-green', percentage: 40 },
  ];

  useEffect(() => {
    setTimeout(() => setAnimated(true), 300);
  }, []);

  return (
    <div className="glass-effect p-8 rounded-2xl border border-ice-200 mb-8">
      <h2 className="text-2xl font-bold text-navy-dark mb-6">Cost Comparison</h2>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-navy-dark">{item.label}</span>
              <span className="text-2xl font-bold text-navy-dark">
                ${item.value.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4`}
                style={{ width: animated ? `${item.percentage}%` : '0%' }}
              >
                <span className="text-white font-semibold text-sm">
                  {item.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-savings-green/10 rounded-xl border border-savings-green/20">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <div className="font-semibold text-navy-dark">Potential Monthly Savings</div>
            <div className="text-2xl font-bold text-savings-green">$27,160</div>
          </div>
        </div>
      </div>
    </div>
  );
}
