import { GoogleAuthPayload, LoginPayload, ResetPasswordPayload, SendOTPPayload, SignupPayload, VerifyOTPPayload } from "@/src/types/auth.types"
import axiosClient from "../axiosClient"
import ENDPOINTS from "../endpoints"

const AuthAPI={
    login:(payload:LoginPayload)=> axiosClient.post(ENDPOINTS.AUTH.LOGIN,payload),
    signup:(payload:SignupPayload)=> axiosClient.post(ENDPOINTS.AUTH.SIGNUP,payload),
    googleAuth:(payload:GoogleAuthPayload)=> axiosClient.post(ENDPOINTS.AUTH.GOOGLE_AUTH,payload),
    sendOTP:(payload:SendOTPPayload)=>  axiosClient.post(ENDPOINTS.AUTH.GET_OTP,payload),
    verifyOTP:(payload:VerifyOTPPayload)=>  axiosClient.post(ENDPOINTS.AUTH.VERIFY_OTP,payload),
    resetPassword:(payload:ResetPasswordPayload)=>  axiosClient.post(ENDPOINTS.AUTH.RESET_PASSWORD,payload),
    logout:()=> axiosClient.post(ENDPOINTS.AUTH.LOGOUT),
}

const BlogAPI={
    streamBlog:(topic:string)=> axiosClient.get(`${ENDPOINTS.BLOG.STREAM}?topic=${encodeURIComponent(topic)}`,{responseType:"stream"}),
    readBlog:(blogSlug:string)=> axiosClient.get(`${ENDPOINTS.BLOG.READ_BLOG}?blog_slug=${blogSlug}`),
    getBlog:(blogSlug:string)=> axiosClient.get(`${ENDPOINTS.BLOG.GET_BLOG}?blog_slug=${blogSlug}`),
    getBlogHistory:()=> axiosClient.get(ENDPOINTS.BLOG.BLOG_HISTORY),
    updatePublishedStatus:(updateData: { blog_slug: string; published: boolean })=> axiosClient.patch(ENDPOINTS.BLOG.UPDATE_PUBLISHED, updateData),
    deleteBlog:(blogSlug:string)=> axiosClient.delete(`${ENDPOINTS.BLOG.DELETE_BLOG}?blog_slug=${blogSlug}`),
}

const TestAPI={
    test:()=> axiosClient.get(ENDPOINTS.TEST.TEST)
}

export  {AuthAPI,BlogAPI,TestAPI}