"use client";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

export const MobileSidebar = () => {
  const onOpen = useMobileSidebar((state) => state.onOpen);
  
  return <div>Mobile Sidebar</div>;
};
