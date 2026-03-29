"use client";

import React from "react";
import Image from "next/image";
import PointsImg from "./assets/points_img.png";

const solutionPoints = [
  {
    title: "Reduced Operational Costs",
    description: "Save money on your electricity bills from day one with clean solar energy.",
  },
  {
    title: "24/7 Reliability",
    description: "Solar provides constant, uninterrupted power, ensuring your business never stops.",
  },
  {
    title: "Environmental Sustainability",
    description: "Reduce your carbon footprint while running your business efficiently.",
  },
];

const TheSolutionComp = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  return (
    <section className="lg-biz-section lg-biz-section--green">
      <div className="lg-biz-inner">
        <div className="lg-section-header">
          <h2>
            The Solution –{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Solar Power</em>
            , the Future of Business Energy
          </h2>
          <p>
            Solar power offers a sustainable, reliable, and affordable alternative to grid
            electricity. With LumoGrid, your business can reduce energy costs, gain energy
            independence, and protect operations from unpredictable outages.
          </p>
        </div>

        <div className="lg-biz-cards">
          {solutionPoints.map((point, i) => (
            <div key={i} className="lg-biz-card">
              <h3 className="lg-biz-card__title">{point.title}</h3>
              <p className="lg-biz-card__desc">{point.description}</p>
              <Image src={PointsImg} alt={point.title} className="lg-biz-card__img" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={onGetStarted} className="lg-btn lg-btn--primary">
            Ready to make the switch?
          </button>
        </div>
      </div>
    </section>
  );
};

export default TheSolutionComp;