import { Metadata } from "next";
import LostPasswordForm from "./LostPasswordForm";

export const metadata: Metadata = {
  title: "Lost my password | SimpleShopping",
};

export default function LostPassword() {
  return <LostPasswordForm />
}