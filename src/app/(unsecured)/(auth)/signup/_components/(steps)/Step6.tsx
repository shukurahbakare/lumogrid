"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import { TextInput } from "../../../../../../../components/shared/input";
import AuthHeader from "../../../_components/AuthHeader";

type FormData = {
  energyHours: string;
};

const Step6 = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit =async (data: FormData) => {
    console.log("Step 1 data:", data);
    const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem("signupData", JSON.stringify({...existingData, energyHours: data.energyHours }));

    const storedData = JSON.parse(localStorage.getItem("signupData") || "{}");
    console.log("Stored data before update:", storedData);
    try {
      // Call your API (replace with your endpoint)
      const res = await fetch("https://lumobackend.onrender.com/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storedData)
      });

      // if (!res.ok) {
      //   throw new Error(`API error: ${res.status}`);
      // }

      const result = await res.json();
      console.log("API Response:", result);
      router.push(`/options?id=${result.user._id}`)

          // Assuming response contains { redirectUrl: "https://example.com/data" }
  // if (result.redirectUrl) {
  //     const fullUrl = `https://lumobackend.onrender.com/api/v1/user/recommendations/${result.user._id}`;

  //     const recRes = await fetch(fullUrl, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const recommendations = await recRes.json();
  //     console.log("Recommendations:", recommendations);

  //     // 3️⃣ Save recommendations to state/localStorage if needed
  //     localStorage.setItem("recommendations", JSON.stringify(recommendations));

  //     // 4️⃣ Redirect to options page
  //     router.push(`/options?id=${result.user._id}`);
  //   }
    } catch (err) {
      console.error("Error submitting signup:", err);
      alert("Something went wrong. Please try again.");
    }
    // router.push("/options");
  };
  https://lumobackend.onrender.com/api/v1/user/recommendations/68711a79915fafc376615603

  return (
    <div className="w-full mx-auto">
      <div className="relative bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="max-w-sm mx-auto flex flex-col gap-10 items-center mb-10">
            <label htmlFor="email" className="text-xl mt-4 text-center">
              How Many Hours Do You Need Electricity For In A Day
            </label>

            <TextInput
              type="number"
              name="energyHours"
              placeholder="12"
              register={register}
              
              error={errors.energyHours}
              className="text-center w-full max-w-md"
              label={""}
            />
          </div>

          <div className="w-full flex justify-between mt-6">
            <CustomButton
              text="Previous"
              icon={GoArrowLeft}
              iconPosition="left"
              onClick={() => router.push("/signup/5")}
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

export default Step6;
