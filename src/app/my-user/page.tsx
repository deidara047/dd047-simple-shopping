import { Metadata } from "next";
import MyUserComponent from "./MyUserComponent";

export const metadata: Metadata = {
  title: "My User | SimpleShopping",
};

export default function MyUser() {
  return <MyUserComponent />
}
