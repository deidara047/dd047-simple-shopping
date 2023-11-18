import { Metadata } from "next";
import ConfirmComponent from "./ConfirmComponent";

export const metadata: Metadata = {
  title: "Confirm Email | SimpleShopping",
};


export default function ConfirmEmail() {
  return <ConfirmComponent />
}