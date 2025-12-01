"use client";
import React from "react";
import { useFlutterwave, closePaymentModal,FlutterWaveButton } from "flutterwave-react-v3";

interface FlutterwavePaymentProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  onSuccess?: (response: any) => void;
  onClose?: () => void;
}

const FlutterwavePayment: React.FC<FlutterwavePaymentProps> = ({
  amount,
  customerEmail,
  customerName,
  customerPhone,
  onSuccess,
  onClose,
}) => {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: `TXN_${Date.now()}`,
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,banktransfer",
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: "Power Payment",
      description: "Payment for power service",
      logo: "https://your-logo-url.com/logo.png", // Add your logo URL
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response:any) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            if (response.status === "successful") {
              // Payment was successful
              if (onSuccess) {
                onSuccess(response);
              }
            }
            closePaymentModal();
          },
          onClose: () => {
            if (onClose) {
              onClose();
            }
          },
        });
      }}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
    >
     
      <FlutterWaveButton {...fwConfig} />
    </button>
  );
};

export default FlutterwavePayment;