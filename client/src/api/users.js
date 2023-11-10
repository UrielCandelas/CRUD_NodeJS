import axios from "./axios.js";

export const register = params => axios.post(`/crud`, params);
export const getOne = id => axios.get(`/crud/${id}`);
export const getAllUsers = () => axios.get(`/crud`);
export const edit = (params,id) => axios.put(`/crud/${id}`, params);
export const deleteUser = id => axios.delete(`/crud/${id}`);