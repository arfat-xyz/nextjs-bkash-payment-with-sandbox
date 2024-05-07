import SuccessComponent from "@/component/success-component";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Success | Arfatur Rahman",
  description: "Practice Bkash payment with sandbox",
};
const SuccessPage = () => {
  return <SuccessComponent />;
};

export default SuccessPage;
