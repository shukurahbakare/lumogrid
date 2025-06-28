import React from "react";
import CustomButton from "@/../components/shared/button/CustomButton";
import Image from "next/image";
import SunImage from "../_components/assets/sun.png";
import MaskImage from "../_components/assets/mask.png";

const HeroComp = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${MaskImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "contain",
      }}
      className="bg-black py-12 sm:py-16 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-100 mb-4 leading-tight">
            Empower Your <br className="hidden sm:block" />
            Business With Reliable<br className="hidden sm:block" />
            and Affordable Power
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-300">
            Save On Energy Costs, Boost Efficiency.
          </p>
          <div className="mt-6 sm:mt-8">
            <CustomButton text={"Get Reliable Power Now"} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src={SunImage}
            alt="SunImage"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
