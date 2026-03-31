"use client";

import React from "react";
import Image from "next/image";
import ManImage from "../_components/assets/man.png";

const GetReliablePowerComp = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  return (
    <section className="lg-biz-section lg-biz-section--white">
      <div className="lg-biz-inner">
        <div className="lg-biz-split">
          {/* Green content card */}
          <div className="lg-biz-power-card">
            <div className="lg-biz-power-card__glow" />
            <p className="lg-biz-power-card__text">
              Power outages and high electricity costs are more than just an inconvenience — they
              disrupt operations, affect productivity, and reduce your earnings. As a business owner,
              you need a reliable and cost-effective energy solution that keeps your operations
              running smoothly, 24/7.
            </p>
            <button
              onClick={onGetStarted}
              className="lg-btn lg-btn--cta"
              style={{ alignSelf: "flex-start", fontSize: "1rem", padding: "0.875rem 2rem" }}
            >
              Get Reliable Power Now
            </button>
          </div>

          {/* Image */}
          <div className="lg-biz-split__img-wrap">
            <Image src={ManImage} alt="Business Owner" fill className="lg-biz-split__img" priority />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetReliablePowerComp;