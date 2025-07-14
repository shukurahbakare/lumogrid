"use client";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import AuthHeader from "../../../_components/AuthHeader";
import { useState } from "react";
import { TbCircleMinus, TbCirclePlus } from "react-icons/tb";
import { BiSolidCheckboxChecked, BiCheckbox } from "react-icons/bi";

type Appliance = {
  id: number;
  name: string;
  wattage: number;
  quantity: number;
};

const Step5 = () => {
  const router = useRouter();

  const initialAppliances: Appliance[] = [
    { id: 1, name: "Air Conditioner (1H.P)", wattage: 900, quantity: 0 },
    { id: 2, name: "Refrigerator", wattage: 150, quantity: 0 },
    { id: 3, name: "Television", wattage: 100, quantity: 0 },
    { id: 4, name: "Washing Machine", wattage: 500, quantity: 0 },
  ];

  const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);

  const toggleAppliance = (id: number) => {
    setAppliances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity === 0 ? 1 : 0 }
          : item
      )
    );
  };

  const changeQuantity = (id: number, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleNext = () => {
    const selected = appliances.filter((a) => a.quantity > 0);
    localStorage.setItem("selectedAppliances", JSON.stringify(selected));
    router.push("/signup/6");
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />
        <div className="w-full">
          <label className="text-xl mt-4 mb-6 block text-center">
            What appliances do you use, and how many?
          </label>

          <div className="space-y-3">
            {appliances.map((appliance) => (
              <div
                key={appliance.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition bg-gray-200/40

                `}
                onClick={() => toggleAppliance(appliance.id)}
              >
                <div className="flex items-center gap-1">
                  {appliance.quantity > 0 ? (
                    <BiSolidCheckboxChecked className="text-[#34CF94] text-4xl" />
                  ) : (
                    <BiCheckbox className="text-gray-200 text-4xl" />
                  )}
                  <div className="flex  items-center gap-2">
                    <p className="font-medium">{appliance.name}</p>
                    <p className="text-xs text-white bg-[#34CF94] rounded px-1 py-0.5 ">
                      {appliance.wattage} Watts
                    </p>
                  </div>
                </div>

                {appliance.quantity > 0 && (
                  <div className="flex items-center gap-1 border border-gray-300 rounded-lg px-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeQuantity(appliance.id, -1);
                      }}
                    >
                      <TbCircleMinus className="text-lg text-gray-500" />
                    </button>
                    <span>{appliance.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeQuantity(appliance.id, 1);
                      }}
                    >
                     <TbCirclePlus className="text-lg text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-3xl text-gray-200 italic">
<p>Total kWs: <span className="text-black font-medium">1200Lws</span></p>
          </div>

          <div className="w-full flex justify-between mt-10">
            <CustomButton
              text="Previous"
              icon={GoArrowLeft}
              iconPosition="left"
              onClick={() => router.push("/signup/4")}
            />
            <CustomButton
              text="Next"
              icon={GoArrowRight}
              iconPosition="right"
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
