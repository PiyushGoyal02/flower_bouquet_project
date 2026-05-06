import axiosInstance from "./axiosInstance";

export const signinApi = (data) =>
  axiosInstance.post("/auth/signin", data);

export const signupApi = (data) =>
  axiosInstance.post("/auth/signup", data);

export const adminSigninApi = (data) => 
  axiosInstance.post("/auth/admin/signin", data)

export const adminSignupApi = (data) => 
  axiosInstance.post("/auth/admin/signup", data)
