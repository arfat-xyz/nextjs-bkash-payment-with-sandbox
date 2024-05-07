import FormComponent from "@/component/form-component";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home | Arfatur Rahman",
  description: "Practice Bkash payment with sandbox",
};
export default function Home() {
  return <FormComponent />;
}
