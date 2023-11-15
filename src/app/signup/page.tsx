import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | SimpleShopping",
};

export default function SignUp() {
  return (
    <div className="mt-11">
      <div className="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <SignUpForm />
      </div>
    </div>
  );
}
