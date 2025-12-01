"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CustomButton from "../../../../../../../components/shared/button/CustomButton";
import { TextInput } from "../../../../../../../components/shared/input";
import AuthHeader from "../../../_components/AuthHeader";
// import LoadingSpinner from "../../../../../../../components/shared/loader/LoadingSpinner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

type FormData = {
  energyHours: string;
};

const Step6 = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing your information...");
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    setLoadingMessage("Processing your information...");
    
    console.log("Step 6 data:", data);
    const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem("signupData", JSON.stringify({...existingData, energyHours: data.energyHours }));

    const storedData = JSON.parse(localStorage.getItem("signupData") || "{}");
    console.log("Stored data before update:", storedData);
    
    // Show timeout warning after 5 seconds
    const timeoutWarning = setTimeout(() => {
      setLoadingMessage("This is taking longer than usual. Please wait...");
    }, 5000);
    
    // Show server startup message after 10 seconds (cold start indicator)
    const coldStartWarning = setTimeout(() => {
      setLoadingMessage("Starting up servers... Almost there!");
    }, 10000);
    
    try {
      const startTime = Date.now();
      setLoadingMessage("Creating your account...");
      
      // Call your API
      const res = await fetch("https://lumobackend.onrender.com/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storedData)
      });
      
      const endTime = Date.now();
      console.log(`API took ${(endTime - startTime) / 1000} seconds`);
      
      // Clear timeout warnings
      clearTimeout(timeoutWarning);
      clearTimeout(coldStartWarning);

      const result = await res.json();
      console.log("API Response:", result);
      
      // Check if the response indicates an error
      // if (!res.ok || result.error || result.message) {
      //   // Handle error responses
      //   setIsLoading(false);
      //   const errorMessage = result.message || result.error || "Something went wrong. Please try again.";
      //   setError(errorMessage);
        
      //   // If it's a duplicate email error, redirect to step 1
      //   if (errorMessage.toLowerCase().includes("User with this email already exists.")) {
      //     setTimeout(() => {
      //       router.push("/signup/1");
      //     }, 3000);
      //   }
      //   return;
      // }
      
      if (result && result.user) {
        setLoadingMessage("Calculating your perfect energy solution...");
        
        // Optional: Fetch recommendations
        // const fullUrl = `https://lumobackend.onrender.com/api/v1/user/recommendations/${result.user._id}`;
        // const recRes = await fetch(fullUrl, {
        //   method: "GET",
        //   headers: { "Content-Type": "application/json" },
        // });
        // const recommendations = await recRes.json();
        // localStorage.setItem("recommendations", JSON.stringify(recommendations));
        
        setLoadingMessage("Success! Redirecting...");
        
        // Small delay so user sees success message
        setTimeout(() => {
          router.push(`/options?id=${result.user._id}`);
        }, 500);
      }
    } catch (err) {
      console.error("Error submitting signup:", err);
      clearTimeout(timeoutWarning);
      clearTimeout(coldStartWarning);
      setIsLoading(false);
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Full-screen loader overlay */}
      {isLoading && <LoadingSpinner fullScreen text={loadingMessage} size="lg" />}
      
      <div className="relative bg-white max-w-lg border-t-4 border-green-400 rounded-2xl mt-10 py-10 px-8 mx-auto flex flex-col items-center justify-center">
        <AuthHeader title="Let's Get to Know You Better to Create Your Perfect Energy Solution!" />

        {/* Error Message Display */}
        {error && (
          <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                {error.toLowerCase().includes("email already exists") && (
                  <p className="mt-2 text-xs text-red-600">
                    Redirecting you to update your email...
                  </p>
                )}
              </div>
              <button
                onClick={() => setError(null)}
                className="flex-shrink-0 text-red-400 hover:text-red-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="max-w-sm mx-auto flex flex-col gap-10 items-center mb-10">
            <label htmlFor="energyHours" className="text-xl mt-4 text-center">
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
              // disabled={isLoading}
            />
            <CustomButton
              text="Next"
              icon={GoArrowRight}
              iconPosition="right"
              // disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step6;