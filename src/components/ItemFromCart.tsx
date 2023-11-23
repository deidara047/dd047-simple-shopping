import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/redux/hooks";
import { decrementAmountOfProduct, incrementAmountOfProduct, removeProduct } from "@/redux/features/cartSlice";

type signTypes = "minus" | "plus";

interface CProps {
  id: String;
  name: String;
  imageRoute: String;
  amount: Number;
}

const ItemFromCart: React.FC<CProps> = (props) => {
  const dispatch = useAppDispatch();

  function onCountItemButtonsClicked(sign: signTypes) {
    switch (sign) {
      case "minus":
        dispatch(decrementAmountOfProduct(props.id))
        break;
      case "plus":
        dispatch(incrementAmountOfProduct(props.id))
    }
  }

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
      <div
        className="p-2.5 bg-slate-700 rounded-l-md flex items-center"
        style={{ maxWidth: "125px", alignSelf: "stretch" }}
      >
        <img
          className="object-cover w-full"
          src={String(props.imageRoute)}
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal flex-grow">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <div className="flex gap-2 items-center">
          <button
            className="text-white hover:text-slate-400 px-2 py-1 hover:bg-gray-600 rounded-md border border-gray-600"
            style={{ transition: ".1s ease" }}
            onClick={() => onCountItemButtonsClicked("minus")}
          >
            -
          </button>
          <span className="text-white">{String(props.amount)}</span>
          <button
            className="text-white hover:text-slate-400 px-2 py-1 hover:bg-gray-600 rounded-md border border-gray-600"
            style={{ transition: ".1s ease" }}
            onClick={() => onCountItemButtonsClicked("plus")}
          >
            +
          </button>
        </div>
        <div className="mt-3 flex">
          <button
            className="bg-[#e74c3c] text-xs px-5 py-1.5 rounded-md text-white hover:bg-[#c0392b]"
            style={{ transition: ".2s ease" }}
            onClick={() => dispatch(removeProduct(props.id))}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFromCart;
