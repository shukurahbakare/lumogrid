"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo.png";
import lumologo from "@/../public/lumologo.png";

const AuthNav = () => {
  return (
    <nav className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
            <Link href="/">
    <Image src={lumologo} alt="Lumogrid Logo" width={100} height={100} />
  </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
