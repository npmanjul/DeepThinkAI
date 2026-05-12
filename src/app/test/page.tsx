"use client";
import { TestAPI } from "@/src/services/api";
import { useEffect } from "react";

const page = () => {
  const fetchUrl = async () => {
    try {
      const resp = TestAPI.test();
      console.log(resp);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return (
    <div>
      <div>{process.env.NEXT_PUBLIC_API_BASE_URL}</div>
      <div>{process.env.NEXT_PUBLIC_DEVELOPMENT_ENV}</div>
    </div>
  );
};

export default page;
