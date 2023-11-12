import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type signTypes = "minus" | "plus";

export default function ItemFromCart() {
  const [countItem, setCountItem] = useState(0);
  
  function onCountItemButtonsClicked(sign: signTypes) {
    switch (sign) {
      case "minus":
        if (countItem > 0) {
          setCountItem(countItem - 1);
        }
        break;
      case "plus":
        setCountItem(countItem + 1);
        break;
    }
  }

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
      <div
        className="p-2.5 bg-slate-700 rounded-l-md flex items-center"
        style={{ maxWidth: "125px", alignSelf: "stretch" }}
      >
        <img className="object-cover w-full" src="/ball.png" alt="" />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal flex-grow">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Soccer Ball
        </h5>
        <div className="flex gap-2 items-center">
          <button
            className="text-white hover:text-slate-400 px-2 py-1 hover:bg-gray-600 rounded-md border border-gray-600"
            style={{ transition: ".1s ease" }}
            onClick={() => onCountItemButtonsClicked("minus")}
          >
            -
          </button>
          <span className="text-white">{countItem}</span>
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
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
