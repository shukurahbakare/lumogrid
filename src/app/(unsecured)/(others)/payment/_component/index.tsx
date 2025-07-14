"use client";
import CustomDialog, {
  handleToggleDialog,
} from "@/components/shared/CustomDialog";
import React from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import FAQs from "../../../_components/FAQs";

const PaymentModule = () => {
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
