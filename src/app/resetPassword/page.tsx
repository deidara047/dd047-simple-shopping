import { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset my password | SimpleShopping",
};

export default function ResetPassword() {
  return <ResetPasswordForm />
}