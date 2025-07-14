"use client";
import React from "react";
import { TextInput } from "@/../components/shared/input";
import { useForm } from "react-hook-form";
import CustomButton from "@/../components/shared/button/CustomButton";
import { GoArrowRight } from "react-icons/go";
import AuthHeader from "../../../_components/AuthHeader";
import { useRouter } from "next/navigation";

const Step1 = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<{
    name: string;
  }>();

  const onSubmit = (data: { name: string }) => {
    console.log(data);
    router.push('/signup/2');
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader
          title="Let’s Get to Know You Better to
Create Your Perfect Energy Solution!"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xs flex flex-col gap-10 items-center"
        >
          <label htmlFor="" className="text-xl mt-4">
            What is Your Name?
          </label>
          <TextInput
            label={""}
            name={"name"}
            placeholder="Shukurah Bakare"
            register={register}
            className="text-center"
            info={"First Name, Middle Name, Surname"}
          />

          <CustomButton text="Next" icon={GoArrowRight} />
        </form>
      </div>
    </div>
  );
};

export default Step1;
