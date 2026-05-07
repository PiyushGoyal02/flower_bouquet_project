import axiosInstance from "./axiosInstance";

export const addProductApi = (formData) =>
  axiosInstance.post("/products/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllProductsApi = () => 
  axiosInstance.get("/products/get-all-products");

export const deleteProductApi = (productId) => 
  axiosInstance.delete(`/deleteProduct/delete-product/${productId}`);

export const updateProductApi = (productId, updatedData) =>
  axiosInstance.put(`/updateProducts/update-product/${productId}`, { ...updatedData });

export const getAllCategoriesApi = () =>
  axiosInstance.get("/categories/get-all-categories");