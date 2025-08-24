import React from "react";
import AuthNav from "@/app/(unsecured)/(auth)/_components/AuthNav";
import BgImage from "./_components/assets/mask.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
      className="h-screen bg-slate-100"
    >
      <AuthNav />
      <div className="">{children}</div>
    </div>
  );
}
