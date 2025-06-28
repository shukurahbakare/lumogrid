"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo.png";

const AuthNav = () => {
  return (
    <nav className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href={"/"} className="flex-shrink-0 flex items-center">
            <Image src={Logo} alt="Lumogrid Logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
