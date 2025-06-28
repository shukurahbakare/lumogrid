import React from "react";
import TopNav from "../../../../components/shared/nav/TopNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopNav />
      {children}
    </div>
  );
}
