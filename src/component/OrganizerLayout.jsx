import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import OrganizerSidebar from "./OrganizerSidebar";
import OrganizerHeader from "./OrganizerHeader";

export const OrganizerLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <OrganizerHeader />
      <div className="flex flex-1 relative">
        <OrganizerSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 pt-6 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;