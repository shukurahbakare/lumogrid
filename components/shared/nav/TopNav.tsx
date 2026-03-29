"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import lumologo from "../../../public/lumologo.png"; // Adjust the path as needed
import Logo from "@/../public/lumologo.png"

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

interface HeaderProps {
  onOpenModal?: () => void;
}

const navLinks = [
  { label: "For Business", href: "/business" },
  { label: "FAQ", href: "/faqs" },
  { label: "Blog", href: "/blog" },
];

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "box-shadow 0.3s, background 0.3s",
          boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
          background: isScrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
        }}
      >
        <div className="lg-nav__inner">
          {/* Logo */}
          <Link href="/" className="lg-nav__logo">
            <div style={{ color: "var(--color-primary)" }}>
              {/* <SunIcon /> */}
              <Image src={Logo} alt="Lumogrid logo" width={150} height={50} />
            </div>
            
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ display: "flex", gap: "2rem" }} className="lg-nav__links">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="lg-nav__link">
                  {link.label}
                </Link>
              ))}
            </div>
            <button onClick={onOpenModal} className="lg-btn lg-btn--nav">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--color-text)",
            }}
            className="lg-mobile-menu-btn"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 40,
              }}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: 300,
                background: "white",
                boxShadow: "var(--shadow-lg)",
                zIndex: 50,
                overflowY: "auto",
                padding: "1.5rem",
              }}
            >
              {/* Close */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ padding: "0.5rem", border: "none", background: "transparent", cursor: "pointer", borderRadius: "0.5rem" }}
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Logo */}
              <Link
                href="/"
                className="lg-nav__logo"
                style={{ marginBottom: "2rem", display: "flex" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div style={{ color: "var(--color-primary)" }}><Image src={Logo} alt="Lumogrid logo" width={100} height={28} /></div>
                Lumogrid
              </Link>

              {/* Links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: "block",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.5rem",
                        fontWeight: 500,
                        color: "var(--color-text)",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                onClick={() => { setIsMobileMenuOpen(false); onOpenModal?.(); }}
                className="lg-btn lg-btn--primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;