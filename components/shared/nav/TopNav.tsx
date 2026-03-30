"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/lumologo.png";
import CustomButton from "../button/CustomButton";

const navLinks = [
  {
    label: "Products",
    subLinks: [
      { label: "For personal", href: "/" },
      { label: "For business", href: "/business" },
    ],
  },
  { label: "Company", href: "/" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
];

const TopNav = () => {
  const productsDialogRef = useRef<HTMLDialogElement>(null);
  const mobileMenuRef = useRef<HTMLDialogElement>(null);

  const closeMobileMenu = () => {
    mobileMenuRef.current?.close();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            
       <Link href="/">
    <Image src={Logo} alt="Lumogrid Logo" width={100} height={100} />
  </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link, idx) =>
              link.subLinks ? (
                <div className="relative group" key={link.label}>
                  <button
                    className="inline-flex items-center px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors focus:outline-none"
                    onClick={() => productsDialogRef.current?.show()}
                    aria-haspopup="dialog"
                    aria-expanded={productsDialogRef.current?.open}
                    aria-controls="products-dialog"
                    type="button"
                  >
                    {link.label}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <dialog
                    ref={productsDialogRef}
                    id="products-dialog"
                    className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 open:opacity-100 open:visible opacity-0 invisible transition-opacity duration-150"
                    onMouseLeave={() => productsDialogRef.current?.close()}
                    onClick={() => productsDialogRef.current?.close()}
                  >
                    <div
                      className="py-1"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => productsDialogRef.current?.show()}
                    >
                      {link.subLinks.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </dialog>
                </div>
              ) : (
                <Link
                  key={idx}
                  href={link.href!}
                  className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center">
            <CustomButton text={"Create Account"} link="/signup/1"/>
            <button
              onClick={() => mobileMenuRef.current?.showModal()}
              className="md:hidden flex ml-2 items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Open menu"
              type="button"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <dialog
        ref={mobileMenuRef}
        className="md:hidden bg-white border-t border-gray-200 px-2 pt-2 pb-3 space-y-1 w-full max-w-none left-0 top-0 fixed"
        style={{ inset: 0, border: "none", borderRadius: 0, padding: 0 }}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-900">LumoGrid</span>
          <button
            onClick={() => mobileMenuRef.current?.close()}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Close menu"
            type="button"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link, idx) =>
            link.subLinks ? (
              <details key={link.label}>
                <summary className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 rounded cursor-pointer transition-colors">
                  <span>{link.label}</span>
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="pl-4">
                  {link.subLinks.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={sub.href}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 rounded transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={idx}
                href={link.href!}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </dialog>
    </nav>
  );
};

export default TopNav;