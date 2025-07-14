"use client";
import CustomDialog, {
  handleToggleDialog,
} from "@/components/shared/CustomDialog";
import React from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import FAQs from "../../../_components/FAQs";
import { RiArrowRightSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HouseImg from "../../options/_components/assets/graphic.png";

const PaymentModule = () => {
  const router = useRouter();
  const options = [
    {
      id: 1,
      amount: "N120,000",
      priceBreakdown: {
        distance: "5 km",
        capacity: "5 kw",
      },
      description:
        "Can power a 220 watt fan, light in a room, five sockets and TV set! Can last up to 12 hours after full charge!",
    },
  ];
  return (
    <div className="w-full mx-auto p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="py-8 flex justify-between">
          <div className="text-2xl text-gray-800 mb-4 flex items-center gap-2">
            <HiMiniArrowLeft />
            <p className="text-xl">Options</p>
          </div>
          <div
            onClick={() => handleToggleDialog("FAQs", true)}
            className="cursor-pointer text-2xl text-gray-800 mb-4 flex items-center gap-2"
          >
            <p>💡</p>
            <p className="text-lg">Got Questions? Click Here</p>
          </div>
        </header>
        <h2 className="text-3xl font-bold mb-4 text-black max-w-md">
          You are about to experience reliable and affordable power!
        </h2>
        <div>
          <div className="grid md:grid-cols-3 gap-3">
            {options.map((option) => (
              <div
                key={option.id}
                className="col-span-2 grid md:grid-cols-2 gap-10 bg-white px-6 py-10 mb-6 border-t-3 border-green-400 rounded-xl "
              >
                <Image src={HouseImg} alt="HouseImg" />
                <div>
                  <p className="text-lg text-gray-700 mb-4 flex justify-between">
                    <span>Amount</span>
                    <span className="text-2xl text-black font-bold">
                      {option.amount}
                    </span>{" "}
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
                      <span>Distance</span>{" "}
                      <span>{option.priceBreakdown.distance}</span>{" "}
                    </p>
                    <p className="flex justify-between">
                      <span>Capacity</span>{" "}
                      <span>{option.priceBreakdown.capacity}</span>{" "}
                    </p>
                  </div>
                  <p className="text-gray-900 bg-yellow-200/40 text-xs py-3 px-2">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

export default PaymentModule;
