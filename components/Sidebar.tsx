'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Upload', path: '/dashboard/upload', icon: '📤' },
  { name: 'Reports', path: '/dashboard/reports', icon: '📑' },
  { name: 'Cost Comparison', path: '/dashboard/comparison', icon: '💰' },
  { name: 'Optimization', path: '/dashboard/optimization', icon: '⚡' },
  { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-ice-soft hover-glow"
      >
        <span className="text-2xl">{isCollapsed ? '☰' : '✕'}</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-ice-200 transition-all duration-300 z-40 ${
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-ice-200">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Cloud Migration Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              {!isCollapsed && (
                <span className="font-bold text-navy-dark text-lg">
                  Cloud Migration
                </span>
              )}
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-ice-100 text-ice-600 shadow-ice-soft'
                      : 'text-gray-600 hover:bg-ice-50 hover:text-ice-600'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Button (Desktop) */}
          <div className="hidden lg:block p-4 border-t border-ice-200">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full px-4 py-3 text-gray-600 hover:bg-ice-50 rounded-xl transition-all flex items-center justify-center"
            >
              <span className="text-xl">{isCollapsed ? '→' : '←'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
}
