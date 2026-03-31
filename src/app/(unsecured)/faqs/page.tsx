"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../../../components/shared/nav/TopNav";
import Footer from "../../../../components/shared/footer";
import ContactModal from "../../../../components/shared/contactModal";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`lg-faq-item${isOpen ? " lg-faq-item--open" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="lg-faq-item__trigger" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg-faq-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p className="lg-faq-item__answer">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How long does installation take?",
        a: "Most installations finish within a week after payment confirmation. Our certified technicians handle everything — you just need to grant access.",
      },
      {
        q: "What payment options are available?",
        a: "We offer full upfront payment, flexible instalments, third-party financing, and pay-as-you-go options depending on your chosen system.",
      },
      {
        q: "Do I need to prepare anything before installation?",
        a: "We'll provide a detailed checklist before installation. Generally, you'll need to ensure roof access and clear the installation area.",
      },
    ],
  },
  {
    category: "Technical Questions",
    questions: [
      {
        q: "Does solar work during cloudy or rainy weather?",
        a: "Yes. Quality panels still generate energy in low light, and battery storage supplies power at night or during overcast periods.",
      },
      {
        q: "What warranty comes with my system?",
        a: "6–12 months on installation workmanship. Solar panels themselves last 25+ years, maintaining 80–90% efficiency over time.",
      },
      {
        q: "How much maintenance do solar panels need?",
        a: "Minimal maintenance is required. We recommend cleaning panels twice a year and annual professional inspections.",
      },
    ],
  },
  {
    category: "Financial",
    questions: [
      {
        q: "Will solar reduce my PHCN bill?",
        a: "Absolutely. Most customers see a 60–90% reduction depending on system size and usage patterns.",
      },
      {
        q: "What is the payback period?",
        a: "Most residential systems pay for themselves within 18–24 months through energy savings.",
      },
      {
        q: "Are there any government incentives?",
        a: "Yes, Nigeria offers various incentives for solar adoption. Contact us for current program details.",
      },
    ],
  },
];

export default function FAQPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setModalOpen(true)} />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main>
        {/* ── Hero ── */}
        <section className="lg-hero" style={{ paddingTop: "calc(5rem + 80px)", paddingBottom: "4rem" }}>
          <div className="lg-hero__grid" />
          <div className="lg-hero__glow--top" />

          <div className="lg-hero__inner" style={{ textAlign: "center" }}>
            <motion.div
              className="lg-hero__badge"
              style={{ margin: "0 auto 1.5rem" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M13 2L4.5 12.5h6L9 22l9.5-10.5h-6L13 2z" />
              </svg>
              Help Center · Support
            </motion.div>

            <motion.h1
              className="lg-hero__title"
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Frequently Asked <em>Questions</em>
            </motion.h1>

            <motion.p
              className="lg-hero__desc"
              style={{ margin: "0 auto", textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Everything you need to know about solar power for your home or business
            </motion.p>
          </div>
        </section>

        {/* ── FAQ Content ── */}
        <section className="lg-faq" style={{ background: "white" }}>
          <div className="lg-faq__inner">
            {faqCategories.map((cat, catIndex) => (
              <div key={catIndex} className="lg-faq__group">
                <motion.h2
                  className="lg-faq__group-title"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {cat.category}
                </motion.h2>
                {cat.questions.map((faq, qIndex) => (
                  <FAQItem key={qIndex} question={faq.q} answer={faq.a} />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="lg-steps" style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 2rem" }}
          >
            <h2 className="lg-section-header" style={{ marginBottom: "1rem" }}>
              Still have questions?
            </h2>
            <p style={{ fontSize: "1.125rem", color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.7 }}>
              Our team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="lg-btn lg-btn--primary"
            >
              Contact Support
            </button>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              Available Monday–Saturday, 9AM–6PM WAT
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}