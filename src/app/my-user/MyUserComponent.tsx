"use client";

import { DBC_History } from "@/dbClassesInterfaces";
import { realmApp } from "@/utils";
import { useEffect, useState } from "react";
import { BSON } from "realm-web";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const fechaFormateada = `${day}-${month}-${year}`;

  return fechaFormateada;
}

export default function MyUserComponent() {
  const app = realmApp;
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState<Array<DBC_History> | null>(
    null
  );

  useEffect(() => {
    if (app.currentUser) {
      loadData();
      setIsLoading(false);
    }
  }, [app.currentUser]);

  async function loadData() {
    if (app.currentUser) {
      try {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("app_db").collection("history");

        const res: Array<DBC_History> = await collection.aggregate([
          {
            $match: { owner_id: new BSON.ObjectId(app.currentUser.id) },
          },
          {
            $lookup: {
              from: "product",
              localField: "itemsPurchased",
              foreignField: "_id",
              as: "itemsPurchased",
            },
          },
        ]);
        setHistoryData(res);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">My User</h1>
      {isLoading ? (
        "..."
      ) : (
        <p className="mt-2">
          My user is: <b>{app.currentUser!.profile.email}</b>
        </p>
      )}

      <h2 className="text-xl mt-2 font-bold">History:</h2>
      {isLoading ? (
        <div className="text-center mt-12">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {historyData != null ? (
            historyData.length > 0 ? (
              <>
                {historyData.map((elem, index) => {
                  return (
                    <div className="flex mt-2 flex-col gap-4" key={elem._id.toString()}>
                      <div className="max-w-md block p-6 dark:text-white bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          # {index + 1}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {formatDate(elem.createdAt)}
                        </p>
                        <h5>Products purchased:</h5>
                        <ul className="max-w-md my-2 space-y-1 list-disc list-inside">
                          {elem.itemsPurchased.map((prod) => {
                            return <li key={prod._id.toString()}>{prod.name}</li>;
                          })}
                        </ul>
                        <p>
                          Total: $<b>{elem.total.toFixed(2)}</b>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="mt-2">
                You don't have any purchased. Go to home, make a purchase and
                come back to see your history
              </p>
            )
          ) : (
            <div className="text-center mt-12">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
