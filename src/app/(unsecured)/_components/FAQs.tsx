"use client";
import React, { useState, useEffect, useRef } from "react";
// import "../_components/landing-page/index.css";

// Scroll-reveal hook
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

const FAQS = [
  { 
    category: "Getting Started",
    questions: [
      { 
        q: "How long does installation take?", 
        a: "Most installations finish within a week after payment confirmation. Our certified technicians handle everything — you just need to grant access." 
      },
      { 
        q: "What payment options are available?", 
        a: "We offer full upfront payment, flexible instalments, third-party financing, and pay-as-you-go options depending on your chosen system." 
      },
      { 
        q: "Do I need to prepare anything before installation?", 
        a: "We'll provide a detailed checklist before installation. Generally, you'll need to ensure roof access and clear the installation area." 
      },
    ]
  },
  { 
    category: "Technical",
    questions: [
      { 
        q: "Does solar work during cloudy or rainy weather?", 
        a: "Yes. Quality panels still generate energy in low light, and battery storage supplies power at night or during overcast periods." 
      },
      { 
        q: "What warranty comes with my system?", 
        a: "6–12 months on installation workmanship. Solar panels themselves last 25+ years, maintaining 80–90% efficiency over time." 
      },
      { 
        q: "How much maintenance do solar panels need?", 
        a: "Minimal maintenance is required. We recommend cleaning panels twice a year and annual professional inspections." 
      },
    ]
  },
  { 
    category: "Financial",
    questions: [
      { 
        q: "Will solar reduce my PHCN bill?", 
        a: "Absolutely. Most customers see a 60–90% reduction depending on system size and usage patterns." 
      },
      { 
        q: "What is the payback period?", 
        a: "Most residential systems pay for themselves within 18-24 months through energy savings." 
      },
      { 
        q: "Are there any government incentives?", 
        a: "Yes, Nigeria offers various incentives for solar adoption. Contact us for current program details." 
      },
    ]
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lg-faq-item ${open ? "lg-faq-item--open" : ""}`}>
      <button className="lg-faq-item__trigger" onClick={() => setOpen(!open)}>
        {question}
        <span>+</span>
      </button>
      <div className="lg-faq-item__body">
        <p className="lg-faq-item__answer">{answer}</p>
      </div>
    </div>
  );
}

function FAQCategory({ category, questions }: { category: string; questions: { q: string; a: string }[] }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-text)", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid var(--color-primary)" }}>
        {category}
      </h3>
      {questions.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
    </div>
  );
}

const LumogridFAQPage = () => {
  const [ref, visible] = useReveal(0.1);

  return (
    <div className="lg-root">
      {/* Hero Header */}
      <section className="lg-hero">
        <div className="lg-hero__glow--top" />
        <div className="lg-hero__glow--bottom" />
        <div className="lg-hero__grid" />

        <div className="lg-hero__inner">
          <div className="lg-hero__text">
            <div className="lg-hero__badge">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M13 2L4.5 12.5h6L9 22l9.5-10.5h-6L13 2z" />
              </svg>
              Help Center · Support
            </div>
            <h1 className="lg-hero__title">
              Frequently Asked <em>Questions</em>
            </h1>
            <p className="lg-hero__desc">
              Everything you need to know about solar power for your home or business
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="lg-faq" ref={ref}>
        <div className="lg-faq__inner" style={{ maxWidth: "60rem" }}>
          <div className={`lg-section-header lg-reveal ${visible ? "visible" : ""}`}>
            <h2>Common Questions</h2>
            <p>Can't find what you're looking for? Contact our support team for personalized assistance.</p>
          </div>
          
          <div className={`lg-reveal ${visible ? "visible" : ""}`} data-delay="100">
            {FAQS.map((category, idx) => (
              <FAQCategory 
                key={idx} 
                category={category.category} 
                questions={category.questions} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lg-cta">
        <div className="lg-cta__glow--top" />
        <div className="lg-cta__glow--bottom" />
        <div className="lg-cta__inner">
          <h2 className="lg-cta__title">
            Still have questions?
          </h2>
          <p className="lg-cta__desc">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <button className="lg-btn lg-btn--cta">Contact Support</button>
          <p className="lg-cta__note">Available Monday–Saturday, 9AM–6PM WAT</p>
        </div>
      </section>
    </div>
  );
};

export default LumogridFAQPage;