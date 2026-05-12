const ENDPOINTS={
    AUTH:{
        LOGIN:"/auth/login",
        SIGNUP:"/auth/signup",
        GOOGLE_AUTH:"/auth/google-auth",
        GET_OTP:"/auth/get-otp",
        VERIFY_OTP:"/auth/verify-otp",
        RESET_PASSWORD:"/auth/reset-password",
        LOGOUT:"/auth/logout"
    },
    BLOG:{
        STREAM:"/blog/stream",
        READ_BLOG:"/blog/read-blog",
        BLOG_HISTORY:"/blog/blog-history",
        UPDATE_PUBLISHED:"/blog/update-published",
        GET_BLOG:"/blog/get-blog",
        DELETE_BLOG:"/blog/delete-blog"
    },
    TEST:{
        TEST:"/test/"
    }
}

export default ENDPOINTS;