import Link from "next/link";
import ItemFromCart from "./ItemFromCart";

export default function CartSideNav() {
  return (
    <div className="flex flex-col grow h-full">
      <div>
        <h2 className="text-2xl font-bold text-white flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{ transform: "translateY(2px)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span>My Cart</span>
        </h2>
      </div>
      <div className="mt-3 grow overflow-y-auto items-from-cart-div">
        <div className="max-h-[100px] flex flex-col gap-4">
          <ItemFromCart />
          <ItemFromCart />
          <ItemFromCart />
          <ItemFromCart />
          <ItemFromCart />
          <ItemFromCart />
          <ItemFromCart />
        </div>
      </div>
      <div className="mt-3">
        <Link
          href="/product/fake-id"
          prefetch={false}
          className="inline-flex items-center px-3 w-full py-2 text-sm font-medium justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Go to purchase
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
