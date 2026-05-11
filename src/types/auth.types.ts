export interface LoginPayload{
    email?:string;
    phone?:string;
    password:string;
}

export interface SignupPayload{
    name:string
    email?:string;
    phone?:string;
    password:string;
}

export interface GoogleAuthPayload{
    credential:string
}

export interface SendOTPPayload{
    email:string
}

export interface VerifyOTPPayload{
    email:string
    otp:string
}

export interface ResetPasswordPayload{
    email:string;
    new_password:string;
}

export type SignupStep = "form" | "otp";