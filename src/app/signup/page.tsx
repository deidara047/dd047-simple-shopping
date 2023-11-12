import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | SimpleShopping',
}

export default function SignUp() {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <Link
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href="#"
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className="ms-3">Sign Up with Google</span>
        </Link>
      </div>
      <small className="text-white mt-4 block">
        <FontAwesomeIcon icon={faCircleInfo} /><span className="ms-2">If the account is already registered, you will simply log in.</span>
      </small>
    </div>
  );
}
