"use client";
import CustomDialog, {
  handleToggleDialog,
} from "@/components/shared/CustomDialog";
import React, { useState, useEffect } from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import FAQs from "../../../_components/FAQs";
import { RiArrowRightSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HouseImg from "../../options/_components/assets/graphic.png";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import LoadingSpinner from "@/components/shared/LoadingSpinner";


type SolarPackage = {
  _id: string;
  packageName: string;
  packageDescription: string;
  buildingType: string;
  maxPower: number;
  amount: number;
  fullChargeHours: number;
};

type UserData = {
  _id?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
};

const PaymentModule = () => {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<SolarPackage | null>(null);
  const [userData, setUserData] = useState<UserData>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  // Load the selected package and user data from localStorage on component mount
  useEffect(() => {
    const storedPackage = localStorage.getItem('selectedPackage');
    console.log("Stored package data:", storedPackage);
    if (storedPackage) {
      const parsedData = JSON.parse(storedPackage);
      setSelectedPackage(parsedData);
      setUserData(parsedData);
    } else {
      // If no package selected, redirect back to options
      router.push('/options');
    }
  }, [router]);

  const paymentMethods = [
    { 
      id: 1, 
      name: "Card Payment", 
      available: true,
      icons: ["visa", "mastercard"],
      method: "card"
    },
    { 
      id: 2, 
      name: "Mobile Payment", 
      available: true,
      icons: ["flutterwave"],
      method: "mobile"
    },
    { 
      id: 3, 
      name: "Pay Later (Instalments)", 
      available: false,
      icons: [],
      method: "installment"
    },
  ];

  // Generate transaction reference with user ID
  const generateTxRef = () => {
    const userId = userData._id || "guest";
    return `TX_${userId}_${Date.now()}`;
  };

  // Flutterwave configuration with user's actual details
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: generateTxRef(),
    amount: selectedPackage?.amount || 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,banktransfer",
    customer: {
      email: userData.email || "customer@example.com",
      phone_number: userData.phoneNumber || "08012345678",
      name: userData.fullName || "Customer",
    },
    customizations: {
      title: selectedPackage?.packageName || "Power Payment",
      description: "Payment for solar power package",
      logo: "", // Add your logo URL here
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePaymentMethodClick = (method: string, available: boolean) => {
    if (!available) {
      return;
    }

    // Immediately trigger Flutterwave popup for mobile payment or card payment
    if (method === "mobile" || method === "card") {
      handleFlutterPayment({
        callback: (response) => {
          console.log("Payment response:", response);
          handlePaymentSuccess(response);
          closePaymentModal();
        },
        onClose: () => {
          console.log("Payment modal closed by user");
        },
      });
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    console.log("Payment successful:", response);
    
    if (response.status === "successful") {
      setIsVerifying(true);
      setVerificationMessage("Verifying your payment...");
      
      try {
        // The backend expects the transaction reference in the URL path
        // Format: https://lumobackend.onrender.com/api/v1/payment/{tx_ref}
        const tx_ref = response.tx_ref || config.tx_ref;
        
        setVerificationMessage("Confirming transaction with our servers...");
        
        const verifyResponse = await fetch(
          `https://lumobackend.onrender.com/api/v1/payment/${tx_ref}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        const verifyData = await verifyResponse.json();
        console.log("Verification response:", verifyData);
        
        if (verifyResponse.ok && verifyData.success) {
          setVerificationMessage("Payment verified successfully!");
          
          // Store payment confirmation
          localStorage.setItem('paymentConfirmed', JSON.stringify({
            transactionId: response.transaction_id,
            txRef: tx_ref,
            package: selectedPackage,
            timestamp: new Date().toISOString()
          }));
          
          // Clear signup data
          localStorage.removeItem('signupData');
          
          // Redirect to success page after short delay
          setTimeout(() => {
            router.push(`/payment-success?tx_ref=${tx_ref}`);
          }, 1500);
          
        } else {
          setIsVerifying(false);
          alert(
            verifyData.message || 
            "Payment verification failed. Please contact support with Transaction ID: " + 
            response.transaction_id
          );
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setIsVerifying(false);
        alert(
          "Payment completed but verification failed. Please contact support with Transaction ID: " + 
          response.transaction_id + 
          " and Reference: " + 
          config.tx_ref
        );
      }
    } else {
      alert("Payment was not successful. Please try again.");
    }
  };

  // Show loading state while package data is being loaded
  if (!selectedPackage) {
    return (
      <div className="p-8 text-center">
        <LoadingSpinner size="lg" text="Loading package details..." />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8">
      {/* Payment Verification Loader */}
      {isVerifying && (
        <LoadingSpinner fullScreen size="lg" text={verificationMessage} />
      )}
      
      <div className="w-full max-w-7xl mx-auto">
        <header className="py-8 flex justify-between">
          <div 
            onClick={() => router.push("/options")} 
            className="text-2xl text-gray-800 mb-4 flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors"
          >
            <HiMiniArrowLeft />
            <p className="text-xl">Options</p>
          </div>
          <div
            onClick={() => handleToggleDialog("FAQs", true)}
            className="cursor-pointer text-2xl text-gray-800 mb-4 flex items-center gap-2 hover:text-green-600 transition-colors"
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
            <div className="col-span-2 grid md:grid-cols-2 gap-10 bg-white px-6 py-10 mb-6 border-t-4 border-green-400 rounded-xl shadow-md">
              <Image src={HouseImg} alt="HouseImg" />
              <div>
                <p className="text-lg text-gray-700 mb-4 flex justify-between">
                  <span className="font-semibold">{selectedPackage.packageName}</span>
                  <span className="text-2xl text-black font-bold">
                    {/* ₦{selectedPackage.amount.toLocaleString()} */}
                  </span>
                </p>
                <div className="text-sm text-gray-600 mb-4 space-y-2">
                  <p className="flex justify-between py-2 border-b border-gray-200">
                    <span>Max Power</span>
                    <span className="font-semibold">{selectedPackage.maxPower} W</span>
                  </p>
                  <p className="flex justify-between py-2 border-b border-gray-200">
                    <span>Full Charge Hours</span>
                    <span className="font-semibold">{selectedPackage.fullChargeHours} hrs</span>
                  </p>
                  <p className="flex justify-between py-2 border-b border-gray-200">
                    <span>Building Type</span>
                    <span className="font-semibold">{selectedPackage.buildingType}</span>
                  </p>
                </div>
                <p className="text-gray-900 bg-yellow-200/40 text-xs py-3 px-2 rounded">
                  {selectedPackage.packageDescription}
                </p>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className="col-span-1 bg-white px-6 py-6 border-t-4 border-green-400 rounded-xl h-fit shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-black">
                Payment Method
              </h3>
              
              {/* Display user info */}
              {userData.fullName && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                  <p className="text-gray-600"><strong>Name:</strong> {userData.fullName}</p>
                  <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
                  <p className="text-gray-600"><strong>Phone:</strong> {userData.phoneNumber}</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handlePaymentMethodClick(method.method, method.available)}
                    className={`bg-black text-white px-4 py-3 rounded-lg flex items-center justify-between ${
                      method.available ? 'cursor-pointer hover:bg-gray-800' : 'cursor-not-allowed opacity-60'
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm font-medium">{method.name}</span>
                      {!method.available && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      )}
                      
                      {method.icons.length > 0 && (
                        <div className="flex items-center gap-1 ml-2">
                          {method.icons.includes("visa") && (
                            <div className="w-8 h-5 bg-blue-700 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-[10px]">VISA</span>
                            </div>
                          )}
                          {method.icons.includes("mastercard") && (
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400 -ml-1.5"></div>
                            </div>
                          )}
                          {method.icons.includes("flutterwave") && (
                            <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-[10px]">FW</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <RiArrowRightSLine className="text-xl" />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-800">
                  🔒 Your payment is secured with Flutterwave
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Dialog */}
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