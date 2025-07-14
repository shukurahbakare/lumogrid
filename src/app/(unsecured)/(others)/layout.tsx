import React from "react";
import AuthNav from "@/app/(unsecured)/(auth)/_components/AuthNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-slate-200/60">
      <AuthNav />
      <div className="">{children}</div>
    </div>
  );
}
