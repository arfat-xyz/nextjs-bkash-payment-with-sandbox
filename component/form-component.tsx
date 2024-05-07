"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  useEffect(() => {
    if (message === "cancel" || message === "failure") {
      toast.error("Please try again");
    }
  }, [message]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount: number = (e.target as any).amount.value;
    setIsLoading(!isLoading);
    // Get a Stripe session URL.
    const response = await fetch("/api/create", {
      method: "POST",
      // credentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });
    if (!response?.ok) {
      if (response.status === 409) {
        return toast.error(
          `You already buy a plan` || "Please refresh the page and try again."
        );
      }
      const errorMessasge = await response.json();
      return toast.error(
        errorMessasge.statusMessage || "Please refresh the page and try again."
      );
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json();
    if (session) {
      window.location.href = session.bkashURL;
    }
  };
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="p-4 rounded-lg w-full md:w-80  border  shadow-inner">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm w-8 h-8 overflow-hidden rounded-full">
            <Image
              width={50}
              height={50}
              className="mx-auto h-8 w-8 rounded-full mb-4"
              src="/arfat-rahman.jpg"
              alt="arfatur Rahman"
            />
          </div>
          <div className="w-full">
            <h1 className="text-3xl text-center mb-2">Practice Sandbox</h1>
            <div className="bg-green-400 p-3 rounded-lg">
              <p>Number: 01929918378</p>
              <p>OTP: 123456</p>
              <p>Password: 12121</p>
            </div>
          </div>
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    AMOUNT
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min={1}
                    max={4999}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Pay with bkash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponent;
