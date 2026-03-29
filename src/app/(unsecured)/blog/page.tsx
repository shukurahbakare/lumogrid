"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../../components/shared/nav/TopNav";
import Footer from "../../../../components/shared/footer";
import ContactModal from "../../../../components/shared/contactModal";

const blogPosts = [
  {
    id: 1,
    title: "5 Reasons Why Nigerian Homes Are Switching to Solar",
    excerpt: "Discover why more families are making the switch to clean, reliable solar energy and saying goodbye to expensive generators.",
    date: "Feb 10, 2026",
    category: "Residential",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding Solar Panel ROI in Nigeria",
    excerpt: "A comprehensive guide to calculating your return on investment and understanding the true cost savings of solar power.",
    date: "Feb 8, 2026",
    category: "Finance",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "How to Maintain Your Solar System",
    excerpt: "Simple maintenance tips to keep your solar panels running at peak efficiency for decades to come.",
    date: "Feb 5, 2026",
    category: "Maintenance",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Solar vs Generator: The True Cost Comparison",
    excerpt: "We break down the real costs of running a generator versus installing solar panels over 5 years.",
    date: "Feb 1, 2026",
    category: "Finance",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Success Story: How the Adeleke Family Went Solar",
    excerpt: "A Lagos family shares their journey from constant blackouts to 24/7 power with solar energy.",
    date: "Jan 28, 2026",
    category: "Case Study",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "The Future of Renewable Energy in Nigeria",
    excerpt: "Exploring the growing renewable energy sector and what it means for Nigerian homeowners.",
    date: "Jan 25, 2026",
    category: "Industry",
    readTime: "12 min read",
  },
];

const categories = ["All", "Residential", "Finance", "Maintenance", "Case Study", "Industry"];

const categoryColors: Record<string, string> = {
  Residential: "#10b981",
  Finance: "#3b82f6",
  Maintenance: "#f59e0b",
  "Case Study": "#8b5cf6",
  Industry: "#ef4444",
};

export default function BlogPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

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
              Insights & Updates
            </motion.div>

            <motion.h1
              className="lg-hero__title"
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Solar Energy <em>Blog</em>
            </motion.h1>

            <motion.p
              className="lg-hero__desc"
              style={{ margin: "0 auto", textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Tips, guides, and insights about solar energy in Nigeria
            </motion.p>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="lg-blog-filter">
          <div className="lg-blog-filter__inner">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`lg-blog-filter__btn${selectedCategory === category ? " lg-blog-filter__btn--active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ── Posts Grid ── */}
        <section className="lg-blog-grid-section">
          <div className="lg-blog-grid-inner">
            {filteredPosts.length > 0 ? (
              <div className="lg-blog-grid">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="lg-blog-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    {/* Image placeholder with category colour */}
                    <div
                      className="lg-blog-card__img"
                      style={{ background: `linear-gradient(135deg, ${categoryColors[post.category] ?? "#10b981"}22, ${categoryColors[post.category] ?? "#10b981"}44)` }}
                    >
                      <span
                        className="lg-blog-card__category"
                        style={{ background: categoryColors[post.category] ?? "var(--color-primary)" }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <div className="lg-blog-card__body">
                      <div className="lg-blog-card__meta">
                        <span>{post.date}</span>
                        <span className="lg-blog-card__dot">·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="lg-blog-card__title">{post.title}</h3>
                      <p className="lg-blog-card__excerpt">{post.excerpt}</p>

                      <button className="lg-blog-card__read-more">
                        Read More
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="lg-blog-empty">
                <p className="lg-blog-empty__title">No posts found</p>
                <p className="lg-blog-empty__sub">Try selecting a different category</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
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
            <h2 className="lg-cta__title">Stay Informed</h2>
            <p className="lg-cta__desc">
              Get solar energy tips and updates delivered to your inbox every week
            </p>
            <div className="lg-blog-newsletter">
              <input
                type="email"
                placeholder="Your email address"
                className="lg-blog-newsletter__input"
              />
              <button className="lg-btn lg-btn--cta" style={{ fontSize: "1rem", padding: "0.875rem 1.75rem", whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>
            <p className="lg-cta__note">Join 5,000+ subscribers · Unsubscribe anytime</p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}