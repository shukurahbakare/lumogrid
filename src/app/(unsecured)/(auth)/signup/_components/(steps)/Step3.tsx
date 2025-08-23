"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import { TextInput } from "../../../../../../../components/shared/input";
import AuthHeader from "../../../_components/AuthHeader";

type FormData = {
  phone: string;
};

const Step3 = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Step 1 data:", data.phone);
     const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem("signupData", JSON.stringify({ ...existingData,phone: data.phone }));
    router.push("/signup/4");
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="max-w-sm mx-auto flex flex-col gap-10 items-center mb-10">
            <label htmlFor="phone" className="text-xl mt-4">
              What is Your Phone Number?
            </label>

            <TextInput
              type="number"
              name="phone"
              placeholder="08123283944"
              register={register}
              validation={{
                required: "Phone Number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Invalid phone number",
                },
              }}
              error={errors.phone}
              className="text-center w-full max-w-md"
              label={""}
            />
          </div>

          <div className="w-full flex justify-between mt-6">
            <CustomButton
              text="Previous"
              icon={GoArrowLeft}
              iconPosition="left"
              onClick={() => router.push("/signup/2")}
            />
            <CustomButton
              text="Next"
              icon={GoArrowRight}
              iconPosition="right"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3;
