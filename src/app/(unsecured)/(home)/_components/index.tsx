"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../../../components/shared/nav/TopNav";
import Footer from "../../../../../components/shared/footer";
import ContactModal from "../../../../../components/shared/contactModal";
import './index.css';

const Icon = ({ path, className = "", style }: { path: string; className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d={path} />
  </svg>
);

const benefits = [
  {
    icon: "M13 2L4.5 12.5h6L9 22l9.5-10.5h-6L13 2z",
    title: "24/7 Power",
    desc: "Never experience blackouts again with reliable solar energy storage.",
  },
  {
    icon: "M23 6l-7 7-4-4-9 9M17 6h6v6",
    title: "Save 80%",
    desc: "Dramatically reduce your monthly electricity bills from day one.",
  },
  {
    icon: "M12 2L4 6v6c0 5.25 3.83 10.15 8 11.5C16.17 22.15 20 17.25 20 12V6l-8-4z",
    title: "12-Month Warranty",
    desc: "Full protection on all equipment and professional installation.",
  },
  {
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v5l3 3",
    title: "Fast Setup",
    desc: "Professional installation completed within 2–3 days, not weeks.",
  },
];

const steps = [
  {
    number: "01",
    title: "Free Assessment",
    desc: "We analyze your energy needs and usage patterns at no cost to you.",
  },
  {
    number: "02",
    title: "Custom Design",
    desc: "A solar solution tailored specifically to your home and budget.",
  },
  {
    number: "03",
    title: "Installation",
    desc: "Expert setup completed in days by our certified technicians.",
  },
  {
    number: "04",
    title: "Ongoing Support",
    desc: "24/7 monitoring, maintenance, and dedicated customer support.",
  },
];

const stats = [
  { value: "5,000+", label: "Homes Powered" },
  { value: "₦2.5B+", label: "Customer Savings" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setModalOpen(true)} />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main>
        {/* ── Hero ── */}
        <section className="lg-hero" style={{ paddingTop: "calc(8rem + 80px)" }}>
          <div className="lg-hero__grid" />
          <div className="lg-hero__glow--top" />
          <div className="lg-hero__glow--bottom" />

          <div className="lg-hero__inner">
            <motion.div
              className="lg-hero__text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="lg-hero__badge"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Icon path="M13 2L4.5 12.5h6L9 22l9.5-10.5h-6L13 2z" style={{ width: 14, height: 14 }} />
                Lagos · Affordable Solar Energy
              </motion.div>

              <motion.h1
                className="lg-hero__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Clean Energy for<br />
                <em>Your Home</em>
              </motion.h1>

              <motion.p
                className="lg-hero__desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Join thousands of Nigerian homes enjoying reliable, affordable solar power.
                Say goodbye to blackouts and high electricity bills.
              </motion.p>

              <motion.div
                className="lg-hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="lg-btn lg-btn--primary"
                >
                  Get Your Free Quote →
                </button>
                <button className="lg-btn lg-btn--outline">
                  How It Works
                </button>
              </motion.div>

              <motion.div
                className="lg-hero__stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {stats.map((stat, i) => (
                  <div key={i} className="lg-hero__stat">
                    <div className="lg-hero__stat-value">{stat.value}</div>
                    <div className="lg-hero__stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="lg-benefits">
          <div className="lg-benefits__inner">
            <motion.div
              className="lg-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Why Choose Lumogrid?</h2>
              <p>Join thousands of happy homeowners who've made the switch to clean, reliable solar energy</p>
            </motion.div>

            <div className="lg-benefits__grid">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="lg-benefit-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="lg-benefit-card__icon">
                    <Icon path={benefit.icon} style={{ width: 22, height: 22 }} />
                  </div>
                  <h3 className="lg-benefit-card__title">{benefit.title}</h3>
                  <p className="lg-benefit-card__desc">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="lg-steps">
          <div className="lg-steps__inner">
            <motion.div
              className="lg-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Simple Steps to Energy Freedom</h2>
              <p>Get solar power up and running in just 4 easy steps</p>
            </motion.div>

            <div className="lg-steps__grid">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="lg-step-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div className="lg-step-card__number">{step.number}</div>
                  <h3 className="lg-step-card__title">{step.title}</h3>
                  <p className="lg-step-card__desc">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="lg-cta">
          <div className="lg-cta__glow--top" />
          <div className="lg-cta__glow--bottom" />

          <motion.div
            className="lg-cta__inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="lg-cta__title">Ready to Go Solar?</h2>
            <p className="lg-cta__desc">
              Get a free assessment and custom quote today. No commitment required.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="lg-btn lg-btn--cta"
            >
              Get Your Free Quote
            </button>
            <p className="lg-cta__note">✓ No commitment &nbsp; ✓ Free consultation &nbsp; ✓ Quick response</p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}