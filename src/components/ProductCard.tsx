import Link from "next/link";

interface CProps {
  id: String,
  name: String,
  price: Number,
  imageRoute: String
}

const ProductCard: React.FC<CProps> = (props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div>
        <img src={`/${props.imageRoute}`} style={{maxWidth: 300}} className="h-[300px] my-2 mx-auto object-contain" alt="phone.png"></img>
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {props.name}
          </h5>
        </div>
        <p className="font-bold text-lg mb-3 text-blue-900">
          ${props.price.toFixed(2)}
        </p>
        <Link
          href={`/product/${props.id}`}
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

export default ProductCard;