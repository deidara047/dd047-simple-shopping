import type { Metadata } from "next";
import AppComponent from "./AppComponent";

export const metadata: Metadata = {
  title: "Home | SimpleShopping",
};

export default async function Home() {
  return (
    <AppComponent />
  );
}
