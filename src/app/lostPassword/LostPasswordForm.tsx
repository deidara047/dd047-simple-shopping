"use client";

import { capitalizeFirstLetter, realmApp } from "@/utils";
import Link from "next/link";
import Swal from "sweetalert2";
import { ChangeEvent, useState, FormEvent } from "react";

export default function LostPasswordForm() {
  const [fEmail, setFEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app = realmApp;

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setFEmail(event.target.value);
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({ email: fEmail });
      setIsEmailSent(true);
    } catch (error: any) {
      Swal.fire("Error", capitalizeFirstLetter(error.error), "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isEmailSent ? (
        <div className="block mx-auto mt-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-bold">Reset Password email sent!</span>
              <p className="mt-0.5">
                We just sent you a email. Check your email and click the link we
                sent you.
              </p>
            </div>
          </div>
          <div className="text-sm">
            <Link
              href="/login"
              prefetch={false}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              &lt;&lt; Go to log in
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto mt-10 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Reset your password
            </h5>
            <div>
              <p className="text-black dark:text-white text-sm">
                We'll send you an email. Click the link in that email and
                proceed to change your password.
              </p>
            </div>
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
                value={fEmail}
                onChange={handleChange}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "..." : "Send me the email"}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              <Link
                href="/login"
                prefetch={false}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                &lt;&lt; Go back to log in
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
