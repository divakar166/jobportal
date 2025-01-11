"use client"
import { AppStore, makeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}){
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current){
    try{
      storeRef.current = makeStore()
    } catch (error) {
      console.error("Failed to initialize store:", error);
      return <div>Error initializing Redux store</div>;
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}