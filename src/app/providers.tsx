"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

type ProvidersProps = {
  children: React.ReactNode;
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const Providers=({ children }: ProvidersProps) =>{
  if (!googleClientId && process.env.NODE_ENV !== "production") {
    console.warn(
      "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Google OAuth login may not work."
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId ?? ""}>
      {children}
    </GoogleOAuthProvider>
  );
}
