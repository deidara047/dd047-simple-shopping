"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import { capitalizeFirstLetter, realmApp } from "@/utils";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const app = realmApp;
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
    rpt_pwd: "",
  });

  useEffect(() => {
    let qMessage = searchParams.get("message");

    if(qMessage) {
      if(qMessage === "3312") Swal.fire("User Confirmed Successfully!", "Now you can sign up", "success");
    }
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    let isError = false;
    event.preventDefault();
    setErrorMessage(null);
    setIsFormLoading(true);

    if (formData.pwd.length !== formData.rpt_pwd.length) {
      setErrorMessage("Password and Repeat Password do not match.");
      isError = true;
    };

    if (!isError) {
      try {
        const res = await app.emailPasswordAuth.registerUser({ email: formData.email, password: formData.pwd });
        Swal.fire("Confirm your account", "Congrats! Your account has been registered. Now confirm the account in the email we sent you", "success");
      } catch (error: any) {
        Swal.fire("Error", capitalizeFirstLetter(error.error), "error");
      } finally {
        setIsFormLoading(false);
      }
    } else {
      setIsFormLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign Up
      </h5>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="pwd"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          name="pwd"
          id="pwd"
          minLength={6}
          maxLength={128}
          value={formData.pwd}
          onChange={handleChange}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div>
        <label
          htmlFor="rpt_pwd"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Repeat your Password
        </label>
        <input
          type="password"
          name="rpt_pwd"
          id="rpt_pwd"
          value={formData.rpt_pwd}
          onChange={handleChange}
          minLength={6}
          maxLength={128}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      {errorMessage ? (
        <div>
          <ErrorAlert 
            message={errorMessage}
          />
        </div>
      ) : null}
      <button
        type="submit"
        className="w-full text-white bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={isFormLoading}
      >
        {isFormLoading ? "..." : "Sign Up"}
      </button>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?{" "}
        <Link
          href="/login"
          prefetch={false}
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Go to Log In
        </Link>
      </div>
    </form>
  );
}
