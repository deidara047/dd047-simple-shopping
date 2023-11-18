"use client";

import { ConfirmResult, capitalizeFirstLetter, realmApp } from "@/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";

export default function ResetPasswordForm() {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasConditions, setHasConditions] = useState<ConfirmResult>("pending");
  const [fPassword, setFPassword] = useState("");
  const params = useSearchParams();
  const app = realmApp;

  useEffect(() => {
    if (params.get("token") && params.get("tokenId")) {
      setHasConditions("success");
    } else {
      setHasConditions("error");
      setErrorMessage("Missing 'token' and 'tokenId' query parameters");
    }

    setIsLoading(false);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setFPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (hasConditions === "success") {
      try {
        setIsLoading(true);
        await app.emailPasswordAuth
          .resetPassword({
            password: fPassword,
            token: params.get("token")!,
            tokenId: params.get("tokenId")!,
          });
        
        setIsPasswordChanged(true);
      } catch (error: any) {
        setErrorMessage(capitalizeFirstLetter(error.error));
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="block mx-auto mt-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : errorMessage ? (
        <div className="block mx-auto mt-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="text-white">
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                <span className="font-bold">Error:</span>
                <p>
                  {errorMessage ??
                    "500. Oops! You shouldn't see this. Contact the developer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : isPasswordChanged ? (
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
              <span className="font-bold">Password changed successfully!</span>
              <p className="mt-0.5">
                Now you can log in with your new password.
              </p>
            </div>
          </div>
          <div className="text-sm text-end">
            <Link
              href="/login"
              prefetch={false}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Go to log in
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto mt-10 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Write your new password
            </h5>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your new password
              </label>
              <input
                type="password"
                name="password"
                value={fPassword}
                minLength={6}
                maxLength={128}
                onChange={handleChange}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "..." :"Save my new password"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
