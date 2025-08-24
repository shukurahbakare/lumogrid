"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import CustomDialog, { handleToggleDialog } from "@/components/shared/CustomDialog";
import FAQs from "../../../_components/FAQs";
import HouseImg from "./assets/graphic.png";

type SolarPackage = {
  _id: string;
  packageName: string;
  packageDescription: string;
  buildingType: string;
  maxPower: number;
  amount: number;
  fullChargeHours: number;
};

const OptionsModule = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [options, setOptions] = useState<SolarPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("id"); // passed from Step6
  const baseUrl = "https://lumobackend.onrender.com";

  console.log("Query ID:", id);
  useEffect(() => {
    if (!id) return;

    const fetchRecommendations = async () => {
      console.log("Do we get here at all")
      try {
        const res = await fetch(`${baseUrl}/api/v1/user/recommendations/${id}`);
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();
        console.log("Fetched recommendations:", data.solarPackageRecommendations);
        setOptions(data.solarPackageRecommendations || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading recommendations...</div>;
  }

  return (
    <div className="w-full mx-auto p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="py-8 flex justify-between">
          <div className="text-2xl text-gray-800 mb-4 flex items-center gap-2">
            <HiMiniArrowLeft onClick={() => router.back()} className="cursor-pointer" />
            <p className="text-xl">Suitable Options Nearby For You!</p>
          </div>
          <div
            onClick={() => handleToggleDialog("FAQs", true)}
            className="cursor-pointer text-2xl text-gray-800 mb-4 flex items-center gap-2"
          >
            <p>💡</p>
            <p className="text-lg">Got Questions? Click Here</p>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-3">
          {options.map((option) => (
            <div
              key={option._id}
              className="grid gap-10 bg-white px-6 py-10 mb-6 border-t-3 border-green-400 rounded-xl"
            >
              <Image src={HouseImg} alt="House" />
              <div>
                <p className="text-lg text-gray-700 mb-4 flex justify-between">
                  <span>{option.packageName}</span>
                  <span className="text-2xl text-black font-bold">
                    ₦{option.amount.toLocaleString()}
                  </span>
                </p>
                <div
                  onClick={() => router.push("/payment")}
                  className="flex items-center justify-between text-xs text-gray-600 mb-4 cursor-pointer"
                >
                  <p>Price Breakdown</p>
                  <RiArrowRightSLine className="text-xl" />
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="flex justify-between">
                    <span>Max Power</span> <span>{option.maxPower} W</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Full Charge Hours</span> <span>{option.fullChargeHours} hrs</span>
                  </p>
                </div>
                <p className="text-gray-900 bg-yellow-200/40 text-xs py-3 px-2">
                  {option.packageDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomDialog
        onClose={() => handleToggleDialog("FAQs", false)}
        id={"FAQs"}
        header="Frequently Asked Questions"
      >
        <FAQs />
      </CustomDialog>
    </div>
  );
};

export default OptionsModule;
