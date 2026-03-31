"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faqs" },
  { label: "Blog", href: "/blog" },
];

const contactInfo = [
  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "Lagos, Nigeria" },
  { icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", text: "+234 XXX XXX XXXX" },
  { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5", text: "info@lumogrid.com" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = ["F", "X", "in", "IG"];

const Footer = () => {
  return (
    <footer className="lg-footer" style={{ background: "#111827", color: "rgba(255,255,255,0.7)" }}>
      <div className="lg-footer__inner">
        <div className="lg-footer__grid">

          {/* Brand */}
          <motion.div
            className="lg-footer__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg-footer__logo">
              <div style={{ color: "var(--color-primary)" }}><SunIcon /></div>
              Lumogrid
            </div>
            <p className="lg-footer__brand-desc">
              Powering African homes with clean, reliable, and affordable solar energy.
              Building a sustainable future, one household at a time.
            </p>
            <div className="lg-footer__socials">
              {socialLinks.map((s, i) => (
                <button key={i} className="lg-footer__social">{s}</button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="lg-footer__col-title">Quick Links</p>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="lg-footer__link">
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="lg-footer__col-title">Contact</p>
            {contactInfo.map((item, i) => (
              <div key={i} className="lg-footer__contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0, color: "var(--color-primary)" }}>
                  <path d={item.icon} />
                </svg>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="lg-footer__col-title">Stay Updated</p>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1rem", color: "rgba(255,255,255,0.65)" }}>
              Get the latest news and updates about solar energy.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: "0.625rem 1rem",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "0.75rem",
                  color: "white",
                  fontSize: "0.9375rem",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                }}
              />
              <button
                style={{
                  padding: "0.625rem 1.25rem",
                  background: "var(--color-primary)",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "0.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  whiteSpace: "nowrap",
                  transition: "background 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--color-primary-dark)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--color-primary)")}
              >
                Subscribe
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <motion.div
          className="lg-footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="lg-footer__copy">© {new Date().getFullYear()} Lumogrid. All rights reserved.</p>
          <div className="lg-footer__legal">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="lg-footer__legal-link">
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;