"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CartSideNav from "./CartSideNav";
import { realmApp } from "@/utils";

type IsUserResult = "loading" | "true" | "false";

export default function Navbar() {
  const app = realmApp;
  const [isUserState, setIsUserState] = useState<IsUserResult>("loading");
  const currentRoute = usePathname();
  const [isSideNaveOpened, setIsSideNaveOpened] = useState<boolean>(false);

  useEffect(() => {
    if (app.currentUser) {
      setIsUserState("true");
    } else {
      setIsUserState("false");
    }
  }, [app.currentUser]);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SimpleShopping
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  prefetch={false}
                  className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${
                    currentRoute === "/"
                      ? "md:text-blue-700"
                      : "md:hover:text-blue-700"
                  } md:p-0 dark:text-white`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {isUserState === "false" ? (
                <>
                  <li>
                    <Link
                      href="/login"
                      prefetch={false}
                      className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ${
                        currentRoute === "/login"
                          ? "md:text-blue-700"
                          : "md:hover:text-blue-700"
                      } md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      prefetch={false}
                      className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ${
                        currentRoute === "/signup"
                          ? "md:text-blue-700"
                          : "md:hover:text-blue-700"
                      } md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : isUserState === "true" ? (
                <li>
                  <Link
                    href="/logout"
                    prefetch={false}
                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ${
                      currentRoute === "/logout"
                        ? "md:text-blue-700"
                        : "md:hover:text-blue-700"
                    } md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  >
                    Log Out
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href="/about"
                  prefetch={false}
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ${
                    currentRoute === "/about"
                      ? "md:text-blue-700"
                      : "md:hover:text-blue-700"
                  } md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsSideNaveOpened(true)}
                  className="block py-2 px-3 bag-button relative text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>

                  <div className="bag-num absolute top-0 right-0 rounded-full text-xs py-1 px-2 bg-white text-black">
                    0
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="sidenav flex flex-col fixed top-0 bottom-0 p-6 right-0 bg-slate-800 overflow-x-hidden"
        style={{
          transition: ".3s cubic-bezier(0,0,.22,.99)",
          zIndex: "1",
          width: "350px",
          transform: isSideNaveOpened ? "translateX(0)" : "translateX(100%)",
          boxShadow: "0px 0px 15px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex justify-end">
          <button
            className="text-white hover:text-slate-400"
            style={{ transition: ".1s ease" }}
            onClick={() => setIsSideNaveOpened(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <CartSideNav />
      </div>
    </>
  );
}
