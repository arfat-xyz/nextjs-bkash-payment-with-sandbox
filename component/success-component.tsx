"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const SuccessComponent = () => {
  useEffect(() => {
    toast.success("Congress");
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <p className="bg-green-700 text-white px-4 py-2 rounded-lg">
        Payment successfull
      </p>
      <Link
        href={"/"}
        className="absolute top-4 left-4 shadow-inner px-2 py-3 border rounded-lg "
      >
        {`<`} Try again
      </Link>
    </div>
  );
};

export default SuccessComponent;
