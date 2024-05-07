import FormComponent from "@/component/form-component";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Home | Arfatur Rahman",
  description: "Practice Bkash payment with sandbox",
};
export default function Home() {
  return (
    <Suspense>
      <FormComponent />
    </Suspense>
  );
}
