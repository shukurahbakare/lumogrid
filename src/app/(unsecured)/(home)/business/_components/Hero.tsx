"use client";

import React from "react";
import Image from "next/image";
import SunImage from "../_components/assets/sun.png";
import MaskImage from "../_components/assets/mask.png";

const HeroComp = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  return (
    <section
      className="lg-biz-hero"
      style={{
        backgroundImage: `url(${MaskImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "contain",
      }}
    >
      <div className="lg-biz-hero__glow1" />
      <div className="lg-biz-hero__glow2" />

      <div className="lg-biz-hero__inner">
        <div className="lg-biz-hero__grid">
          {/* Text */}
          <div className="lg-biz-hero__text">
            <h1 className="lg-biz-hero__title">
              Empower Your Business With{" "}
              <em>Reliable Power</em>
            </h1>
            <p className="lg-biz-hero__desc">
              Save on energy costs. Boost efficiency. Power your success.
            </p>
            <button onClick={onGetStarted} className="lg-btn lg-btn--primary">
              Get Reliable Power Now
            </button>
          </div>

          {/* Image */}
          <div className="lg-biz-hero__img-wrap">
            <Image
              src={SunImage}
              alt="Solar Power"
              className="lg-biz-hero__img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComp;