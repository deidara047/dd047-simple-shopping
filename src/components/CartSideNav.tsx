"use client";

import ItemFromCart from "./ItemFromCart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { realmApp } from "@/utils";
import Swal from "sweetalert2";
import { resetCart } from "@/redux/features/cartSlice";
import { useState } from "react";
import { BSON } from "realm-web";

export default function CartSideNav() {
  const [isLoading, setIsLoading] = useState(false);
  const arrCart = useAppSelector((state) => state.cartReducer.arrCart);
  const app = realmApp;
  const dispatch = useAppDispatch();

  async function makeThePurchase() {
    if (app.currentUser) {
      try {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("app_db").collection("history");
        
        setIsLoading(true);
        let objToSave = {
          owner_id: new BSON.ObjectId(app.currentUser.id),
          itemsPurchased: arrCart.map((elem) => new BSON.ObjectId(String(elem.product_id))),
          total: arrCart.reduce(
            (acc: number, item) =>
              acc + Number(item.amount) * Number(item.price),
            0
          ),
          createdAt: new Date()
        };
        
        const res = await collection.insertOne(objToSave);
        console.log(res);
        Swal.fire(
          "Successful purchase!",
          "The purchase has been made successfully. Now you can check the purchase made in My User.",
          "success"
        );
        dispatch(resetCart());
        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

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
          {arrCart.length > 0 ? (
            <>
              {arrCart.map((elem) => {
                return (
                  <ItemFromCart
                    key={elem.product_id}
                    id={elem.product_id}
                    name={elem.name}
                    amount={elem.amount}
                    imageRoute={elem.imageRoute}
                  />
                );
              })}
            </>
          ) : (
            <div
              className="flex items-center p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
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
              <div>No elements in cart.</div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <button
          disabled={arrCart.length === 0 || isLoading}
          className="inline-flex disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:bg-blue-700 items-center px-3 w-full py-2 text-sm font-medium justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          style={{ transition: ".2s ease opacity" }}
          onClick={makeThePurchase}
        >
          {isLoading ? "..." : "Purchase"}
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
        </button>
      </div>
    </div>
  );
}
