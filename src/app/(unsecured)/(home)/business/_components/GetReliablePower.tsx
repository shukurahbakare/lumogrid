import React from "react";
import Image from "next/image";
import ManImage from "../_components/assets/man.png";
import CustomButton from "@/../components/shared/button/CustomButton";

const GetReliablePowerComp = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-16 sm:py-16 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-2">
        <div className="px-8 pt-16 bg-[#34CF94] rounded-xl flex flex-col items-start gap-4">
          <p className="text-white text-xl">
            Power outages and high electricity costs are more than just an
            inconvenience – they disrupt operations, affect productivity, and
            can potentially reduce your earnings. As a business owner, you need
            a reliable and cost-effective energy solution that can keep your
            operations running smoothly, 24/7.
          </p>
          <CustomButton text={"Get Reliable Power Now"} mode="secondary" />
        </div>

        {/* Image Container */}
        <div className="bg-red-300 rounded-xl relative w-full h-[40vw]">
          <Image
            src={ManImage}
            alt="Man"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default GetReliablePowerComp;
