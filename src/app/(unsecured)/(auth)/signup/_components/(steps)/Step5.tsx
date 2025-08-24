"use client";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import AuthHeader from "../../../_components/AuthHeader";
import { useState, useMemo } from "react";
import { TbCircleMinus, TbCirclePlus } from "react-icons/tb";
import { BiSolidCheckboxChecked, BiCheckbox } from "react-icons/bi";

type Appliance = {
  id: number;
  applianceName: string;
  wattage: number;
  count: number;
};

const Step5 = () => {
  const router = useRouter();

  const initialAppliances: Appliance[] = [
    { id: 1, applianceName: "LED Bulb", wattage: 10, count: 0 },
    { id: 2, applianceName: "Ceiling Fan", wattage: 70, count: 0 },
    { id: 3, applianceName: "Standing Fan", wattage: 100, count: 0 },
    { id: 4, applianceName: "Laptop", wattage: 60, count: 0 },
    { id: 5, applianceName: "Desktop Computer + Monitor", wattage: 200, count: 0 },
    { id: 6, applianceName: "Wi-Fi Router", wattage: 15, count: 0 },
    { id: 7, applianceName: "Television (32\")", wattage: 50, count: 0 },
    { id: 8, applianceName: "Television (42\"-55\")", wattage: 120, count: 0 },
    { id: 9, applianceName: "Home Theatre/Sound System", wattage: 150, count: 0 },
    { id: 10, applianceName: "Refrigerator (Small)", wattage: 150, count: 0 },
    { id: 11, applianceName: "Refrigerator (Large)", wattage: 300, count: 0 },
    { id: 12, applianceName: "Freezer (Medium Chest)", wattage: 300, count: 0 },
    { id: 13, applianceName: "Microwave Oven", wattage: 1200, count: 0 },
    { id: 14, applianceName: "Electric Kettle", wattage: 2000, count: 0 },
    { id: 15, applianceName: "Blender", wattage: 500, count: 0 },
    { id: 16, applianceName: "Washing Machine", wattage: 1500, count: 0 },
    { id: 17, applianceName: "Iron", wattage: 1500, count: 0 },
    { id: 18, applianceName: "Water Pump (Small)", wattage: 750, count: 0 },
    { id: 19, applianceName: "Air Conditioner (1 HP)", wattage: 1000, count: 0 },
    { id: 20, applianceName: "Air Conditioner (1.5 HP)", wattage: 1500, count: 0 },
    { id: 21, applianceName: "Printer (Inkjet)", wattage: 40, count: 0 },
    { id: 22, applianceName: "Printer (Laser)", wattage: 400, count: 0 },
    { id: 23, applianceName: "Refrigerated Water Dispenser", wattage: 150, count: 0 },
    { id: 24, applianceName: "Hair Clipper", wattage: 15, count: 0 },
    { id: 25, applianceName: "Electric Cooker (Hot Plate)", wattage: 2000, count: 0 },
  ];

  const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);

  // ✅ Toggle appliance selection
  const toggleAppliance = (id: number) => {
    setAppliances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: item.count === 0 ? 1 : 0 }
          : item
      )
    );
  };

  // ✅ Increase or decrease quantity
  const changeQuantity = (id: number, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(0, item.count + delta) }
          : item
      )
    );
  };

  // ✅ Calculate total watts
  const totalWatts = useMemo(() => {
    return appliances.reduce(
      (sum, item) => sum + item.wattage * item.count,
      0
    );
  }, [appliances]);

  // ✅ Save to localStorage and go to next step
  const handleNext = () => {
    const selected = appliances.filter((a) => a.count > 0);

    const appliancesForApi = selected.map((a) => ({
      applianceName: a.applianceName,
      count: a.count
    }));

    console.log(appliancesForApi);

    const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem("signupData", JSON.stringify({ buildingType: appliancesForApi }));
console.log("log at step 5:", existingData);
    localStorage.setItem(
      "signupData",
      JSON.stringify({
        ...existingData,
        appliances: appliancesForApi,
        totalPower: totalWatts.toString()
      })
    );

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
                className="flex items-center justify-between p-2 rounded cursor-pointer transition bg-gray-200/40"
                onClick={() => toggleAppliance(appliance.id)}
              >
                <div className="flex items-center gap-1">
                  {appliance.count > 0 ? (
                    <BiSolidCheckboxChecked className="text-[#34CF94] text-4xl" />
                  ) : (
                    <BiCheckbox className="text-gray-200 text-4xl" />
                  )}
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{appliance.applianceName}</p>
                    <p className="text-xs text-white bg-[#34CF94] rounded px-1 py-0.5">
                      {appliance.wattage} W
                    </p>
                  </div>
                </div>

                {appliance.count > 0 && (
                  <div className="flex items-center gap-1 border border-gray-300 rounded-lg px-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeQuantity(appliance.id, -1);
                      }}
                    >
                      <TbCircleMinus className="text-lg text-gray-500" />
                    </button>
                    <span>{appliance.count}</span>
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

          {/* ✅ Dynamic total kW display */}
          <div className="mt-6 text-center text-3xl italic">
            <p>
              Total kW:{" "}
              <span className="text-black font-medium">
                {(totalWatts / 1000).toFixed(2)} kW
              </span>
            </p>
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
