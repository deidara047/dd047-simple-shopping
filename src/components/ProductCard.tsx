import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

interface CProps {
  id: String,
  name: String,
  price: Number,
  imageRoute: String,
  isInCart: boolean
}

const ProductCard: React.FC<CProps> = (props) => {
  const dispatch = useAppDispatch();

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
        <button
          className="inline-flex items-center disabled:font-semibold px-3 w-full py-2 text-sm font-medium justify-center disabled:text-black disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-blue-700 hover:bg-blue-800 text-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300"
          disabled={props.isInCart}
          onClick={() => dispatch(addProduct({
            amount: 0,
            imageRoute: props.imageRoute,
            name: props.name,
            product_id: props.id
          }))}
        >
          {props.isInCart ? "In Cart" : "+ Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;