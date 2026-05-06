import axiosInstance from "./axiosInstance";

export const getAllUsersApi = () =>
  axiosInstance.get("/users/get-all-users-data");

export const storeContactFormApi = (formData) =>
  axiosInstance.post("/users/store-contact-form", { ...formData });

// export const getUserByIdApi = (userId) =>
//   axiosInstance.get(`/users/${userId}`);

// export const updateUserApi = (userId, data) =>
//   axiosInstance.put(`/users/${userId}`, data);

// export const deleteUserApi = (userId) =>
//   axiosInstance.delete(`/users/${userId}`);
