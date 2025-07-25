import React from "react";
import Navbar from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-slate-500">
      <Navbar />
      {children}
    </div>
  );
}
