"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import { TextInput } from "../../../../../../../components/shared/input";
import AuthHeader from "../../../_components/AuthHeader";
import { useState } from "react";
import { TbCircleCheckFilled, TbCircle } from "react-icons/tb";

type FormData = {
  phone: string;
};

const Step4 = () => {
  const router = useRouter();
  const houseTypes = [
    { label: "Apartment", value: "apartment" },
    { label: "Bungalow", value: "bungalow" },
    { label: "Duplex", value: "duplex" },
    { label: "Studio Apartment", value: "studio_apartment" },
    { label: "Mansion", value: "mansion" },
    { label: "Villa", value: "villa" },
  ];

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    console.log(type);
  };

  const onSubmit = () => {
    router.push("/signup/5");
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />

        <div className="w-full">
          <div className=" flex flex-col gap-10 items-center mb-10">
            <label htmlFor="phone" className="text-xl mt-4">
              What type of building do you live in?
            </label>

            <div className="grid grid-cols-3 w-full">
              {houseTypes.map((house) => (
                <div
                  key={house.value}
                  onClick={() => handleTypeClick(house.value)}
                  className={`cursor-pointer p-2 rounded-lg border-2 transition-colors ${
                    selectedType === house.value
                      ? "border-green-500 bg-green-100/20"
                      : "border-white bg-white"
                  }`}
                >
                  <div className="w-full h-32 bg-gray-200"></div>
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
                          : "text-gray-400"
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
              onClick={() => onSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
