"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Menu icon component
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-800">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // On desktop, sidebar should always be visible
      if (!isMobileView) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Function to toggle sidebar only on mobile
  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile Header with hamburger menu */}
        <div className="md:hidden bg-white py-3 px-4 shadow-sm border-b border-gray-200 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="border-gray-300 bg-white hover:bg-gray-50 p-1.5"
          >
            <MenuIcon />
          </Button>
          <span className="ml-3 font-medium text-gray-800">
          <Image 
                src="/logo.png" 
                alt="Dashboard Logo" 
                width={150} 
                height={40} 
                className="max-w-[120px] md:max-w-[140px] h-auto"
                priority
              />

          </span>
        </div>

        {/* Main content area with scrolling */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 