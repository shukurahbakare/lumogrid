"use client";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import AuthHeader from "../../../_components/AuthHeader";
import { useState } from "react";
import { TbCircleCheckFilled, TbCircle } from "react-icons/tb";
import Image from "next/image";

const Step4 = () => {
  const router = useRouter();

  const houseTypes = [
    {
      label: "Apartment",
      value: "apartment",
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format",
    },
    {
      label: "Bungalow",
      value: "bungalow",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format",
    },
    {
      label: "Duplex",
      value: "duplex",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format",
    },
    {
      label: "Studio Apartment",
      value: "studio_apartment",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format",
    },
    {
      label: "Mansion",
      value: "mansion",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format",
    },
    {
      label: "Villa",
      value: "villa",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format",
    },
  ];

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const onSubmit = () => {
    const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem(
      "signupData",
      JSON.stringify({ ...existingData, buildingType: selectedType })
    );
    router.push("/signup/5");
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />

        <div className="w-full">
          <div className="flex flex-col gap-10 items-center mb-10">
            <label htmlFor="buildingType" className="text-xl mt-4">
              What type of building do you live in?
            </label>

            <div className="grid grid-cols-3 gap-4 w-full">
              {houseTypes.map((house) => (
                <div
                  key={house.value}
                  onClick={() => setSelectedType(house.value)}
                  className={`cursor-pointer p-2 rounded-lg border-2 transition-all shadow-sm ${
                    selectedType === house.value
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-full h-36 relative rounded-md overflow-hidden">
                    <Image
                      src={house.image}
                      alt={house.label}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-700">
                    {selectedType === house.value ? (
                      <TbCircleCheckFilled className="text-green-500" />
                    ) : (
                      <TbCircle />
                    )}

                    <span
                      className={`${
                        selectedType === house.value
                          ? "text-green-500"
                          : "text-gray-600"
                      } text-xs`}
                    >
                      {house.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-between mt-6">
            <CustomButton
              text="Previous"
              icon={GoArrowLeft}
              iconPosition="left"
              onClick={() => router.push("/signup/3")}
            />

            <CustomButton
              text="Next"
              icon={GoArrowRight}
              iconPosition="right"
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
