"use client";

import React from "react";
import Image from "next/image";
import PointsImg from "./assets/points_img.png";

const roiPoints = [
  {
    title: "Up to 80% Savings",
    description: "Dramatically reduce your monthly energy expenses and improve profit margins.",
  },
  {
    title: "Fast Payback Period",
    description: "Most businesses see full ROI within 18–24 months of installation.",
  },
  {
    title: "Long-term Investment",
    description: "25+ year lifespan means decades of free, clean energy for your business.",
  },
];

const HighROIComp = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  return (
    <section className="lg-biz-section lg-biz-section--white">
      <div className="lg-biz-inner">
        <div className="lg-section-header">
          <h2>
            High{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>ROI</em>
            {" "}– Maximize Your Investment
          </h2>
          <p>
            Switching to solar isn't just good for the planet — it's great for your profit margins
            too! With LumoGrid, businesses can expect:
          </p>
        </div>

        <div className="lg-biz-cards">
          {roiPoints.map((point, i) => (
            <div key={i} className="lg-biz-card lg-biz-card--gray">
              <h3 className="lg-biz-card__title">{point.title}</h3>
              <p className="lg-biz-card__desc">{point.description}</p>
              <Image src={PointsImg} alt={point.title} className="lg-biz-card__img" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={onGetStarted} className="lg-btn lg-btn--primary">
            Calculate Your Savings
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighROIComp;