"use client"
import { realmApp } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const app = realmApp;
  const router = useRouter();

  useEffect(() => {
    if(app.currentUser) {
      app.currentUser.logOut()
        .then(() => {
          router.push("/");
        });
    }
  }, [app.currentUser]);

  return <p>Login out...</p>
}