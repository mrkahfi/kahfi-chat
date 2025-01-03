import React from 'react';
import { useLocation } from 'react-router-dom';

interface MobileLayoutProps {
  children: React.ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();
  const isDetail = location.pathname.includes('/chat/');

  console.log('isDetail ', isDetail);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-white">
      <div
        className={`absolute inset-0 transition-transform duration-300 ease-in-out transform
          ${isDetail ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {!isDetail && children}
      </div>
      <div
        className={`absolute inset-0 transition-transform duration-300 ease-in-out transform
          ${isDetail ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {isDetail && children}
      </div>
    </div>
  );
}

export default MobileLayout;
