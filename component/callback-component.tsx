"use client";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
export const metadata: Metadata = {
  title: "Callback | Arfatur Rahman",
  description: "Practice Bkash payment with sandbox",
};
const CallBackComponent = () => {
  const searchParams = useSearchParams();
  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");
  const id_token = searchParams.get("id_token");
  useEffect(() => {
    if (status === "cancel" || status === "failure") {
      window.location.href = `${process.env.NEXT_PUBLIC_bkash_base_url_for_frontend}?message=${status}`;
    }
    const successFunc = async () => {
      const response = await fetch(`/api/callback`, {
        method: "POST",
        body: JSON.stringify({ paymentID, id_token }),
      });
      if (!response.ok) {
        toast.error("Something went wrong please try");
        // return (window.location.href = `${
        //   process.env.NEXT_PUBLIC_bkash_base_url_for_frontend
        // }?success=${false}`);
      }
      const { success } = await response.json();
      if (success) {
        toast.error("Subscription complete");
        window.location.href = `${
          process.env.NEXT_PUBLIC_bkash_base_url_for_frontend
        }/success?success=${true}`;
        return;
      } else {
        toast.error("Something went wrong please try 2");
        window.location.href = `${
          process.env.NEXT_PUBLIC_bkash_base_url_for_frontend
        }?success=${false}`;
        return;
      }
    };
    if (status === "success") {
      try {
        successFunc();
      } catch (error) {
        console.log(error);
        window.location.href = `${
          process.env.NEXT_PUBLIC_bkash_base_url_for_frontend
        }/billing?message=${(error as any).message}`;
      }
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="w-5 h-5  border-t-transparent border-4 border-green-600 rounded-full animate-spin"></p>
    </div>
  );
};

export default CallBackComponent;
