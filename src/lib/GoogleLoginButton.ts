"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createElement, useEffect, useState } from "react";
import {AuthAPI} from "../services/api";

const GoogleLoginButton = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
      if (!credentialResponse.credential) {
        toast.error("Google credential not found");
        return;
      }

      console.log()

      const res=await AuthAPI.googleAuth({credential:credentialResponse.credential});

      if(res.status==200){
        toast.success("Login successfully");
        router.push("/blog");
      }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign In was unsuccessful");
    router.push("/auth/error");
  };

  return createElement(
    "div",
    { className: "flex justify-center w-full" },
    createElement(GoogleLogin, {
      onSuccess: handleGoogleSuccess,
      onError: handleGoogleError,
      shape: "pill",
      text: "continue_with",
      theme: "filled_black",
      width: "350",
    })
  );
};

export default GoogleLoginButton;