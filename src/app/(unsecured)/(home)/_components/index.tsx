import React from "react";
import CustomButton from "@/../components/shared/button/CustomButton";
import Image from "next/image";
import WomaSeatingWithAFan from "../_components/assets/landing_img.png";

const LandingPageModule = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-12 sm:py-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            All In One Shop For <br className="hidden sm:block" />
            Affordable Alternative <br className="hidden sm:block" />
            Green Energy!
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700">
            Get Power Readily In{" "}
            <span className="font-semibold text-green-700">{`{City}`}</span>
          </p>
          <div className="mt-6 sm:mt-8">
            <CustomButton text={"Get Reliable Power Now"} />
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src={WomaSeatingWithAFan}
            alt="WomaSeatingWithAFan"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageModule;
