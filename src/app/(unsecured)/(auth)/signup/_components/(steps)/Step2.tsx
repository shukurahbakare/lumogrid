"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import { TextInput } from "../../../../../../../components/shared/input";
import AuthHeader from "../../../_components/AuthHeader";
import EmailIcon from "../../../_components/assets/letters.png"

type FormData = {
  email: string;
};

const Step2 = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Step 1 data:", data.email);
     const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem("signupData", JSON.stringify({  ...existingData,email: data.email }));
    router.push("/signup/3");
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="max-w-sm mx-auto flex flex-col gap-10 items-center mb-10">
            <label htmlFor="email" className="text-xl mt-4">
              What is Your Email Address?
            </label>

            <TextInput
              type="email"
              name="email"
              placeholder="shukurah@lumogrid.com"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              error={errors.email}
              className="text-center w-full max-w-md"
              label={""}
            />
          </div>

          <div className="w-full flex justify-between mt-6">
            <CustomButton
              text="Previous"
              icon={GoArrowLeft}
              iconPosition="left"
              onClick={() => router.push("/signup/1")}
            />
            <CustomButton
              text="Next"
              icon={GoArrowRight}
              iconPosition="right"
            />
          </div>
        </form>
  <div className="absolute top-[30%] -right-8 z-10">
    <img src={EmailIcon.src} alt="Email Icon" className="w-24 h-24" />
  </div>
      </div>
    </div>
  );
};

export default Step2;
