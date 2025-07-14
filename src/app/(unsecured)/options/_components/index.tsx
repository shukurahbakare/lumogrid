"use client";
import React, { useEffect, useRef } from "react";
import HouseImg from "./assets/graphic.png";
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { HiMiniArrowLeft } from "react-icons/hi2";
import CustomDialog, {
  handleToggleDialog,
} from "@/components/shared/CustomDialog";
import { faq } from "@/lib/faq";
import { FaRegCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const OptionsModule = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (current: HTMLDetailsElement) => {
    if (!containerRef.current) return;
    const allDetails = containerRef.current.querySelectorAll("details");

    allDetails.forEach((detail) => {
      if (detail !== current && detail.open) {
        detail.removeAttribute("open");
      }
    });
  };

  useEffect(() => {
    const details = containerRef.current?.querySelectorAll("details") || [];

    details.forEach((detail) => {
      const content = detail.querySelector(".content") as HTMLDivElement;
      if (!content) return;

      const setMaxHeight = () => {
        if (detail.open) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0px";
        }
      };

      detail.addEventListener("toggle", setMaxHeight);
      setMaxHeight();
    });
  }, []);

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
    {
      id: 2,
      amount: "N420,000",
      priceBreakdown: {
        distance: "5 km",
        capacity: "5 kw",
      },
      description:
        "Can power a 220 watt fan, light in a room, five sockets and TV set! Can last up to 12 hours after full charge!",
    },
    {
      id: 3,
      amount: "N490,000",
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
              key={option.id}
              className="grid gap-10 bg-white px-6 py-10 mb-6 border-t-3 border-green-400 rounded-xl "
            >
              <Image src={HouseImg} alt="HouseImg" />
              <div>
                <p className="text-lg text-gray-700 mb-4 flex justify-between">
                  <span>Amount</span>
                  <span className="text-2xl text-black font-bold">
                    {option.amount}
                  </span>{" "}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4 cursor-pointer">
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

      <CustomDialog
        onClose={() => handleToggleDialog("FAQs", false)}
        id={"FAQs"}
        header="Frequently Asked Questions"
      >
         <div ref={containerRef} className="mt-10">
      {faq.map((item, index) => (
        <details
          key={index}
          className="group border-b border-green-300 py-4 transition-all duration-300"
          onToggle={(e) => handleToggle(e.currentTarget)}
        >
          <summary className="flex justify-between items-start cursor-pointer list-none">
            <div className="flex items-start gap-4">
              <FaRegCircle className="text-green-500 mt-1 flex-shrink-0" />
              <h3 className="text-lg font-semibold">{item.question}</h3>
            </div>

            <MdKeyboardArrowDown
              className={`
                text-2xl text-green-600 transition-transform duration-300 mt-1
                group-open:rotate-180
              `}
            />
          </summary>

          <div
            className="content ml-8 overflow-hidden transition-all duration-500 ease-in-out max-h-0"
            style={{ maxHeight: "0px" }}
          >
            <p className="text-gray-700 py-3">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
      </CustomDialog>
    </div>
  );
};

export default OptionsModule;
