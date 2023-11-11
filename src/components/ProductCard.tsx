import Image from "next/image";
import ballImg from "../../public/ball.png";
import Link from "next/link";

export default function ProductCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="text-center">
        <Image src={ballImg} style={{maxWidth: 300}} alt="phone.png" priority></Image>
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Soccer Ball
          </h5>
        </div>
        <p className="font-bold text-lg mb-3 text-blue-900">
          $23.45
        </p>
        <Link
          href="/product/fake-id"
          prefetch={false}
          className="inline-flex items-center px-3 w-full py-2 text-sm font-medium justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read More
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
