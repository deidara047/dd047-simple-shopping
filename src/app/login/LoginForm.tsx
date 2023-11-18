"use client";

import Link from "next/link";
import { capitalizeFirstLetter, realmApp } from "@/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import * as Realm from "realm-web";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
  });
  const app = realmApp;
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setIsFormLoading(true);

    try {
      const credentials = Realm.Credentials.emailPassword(
        formData.email,
        formData.pwd
      );

      await app.logIn(credentials);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      Swal.fire("Error", capitalizeFirstLetter(error.error), "error");
    } finally {
      setIsFormLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Log In
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
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          name="pwd"
          id="password"
          placeholder="••••••••"
          value={formData.pwd}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div className="flex items-start">
        <Link
          href="/lostPassword"
          prefetch={false}
          className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
        >
          Lost Password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={isFormLoading}
        className="w-full text-white disabled:bg-blue-400 disabled:hover:bg-blue-400 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isFormLoading ? "..." : "Log In"}
      </button>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?{" "}
        <Link
          href="/signup"
          prefetch={false}
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Create account
        </Link>
      </div>
    </form>
  );
}
