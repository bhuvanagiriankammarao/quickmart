import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/admin/categories/' });

export const getCategories = () => API.get('/');
export const addCategory = (formData) => API.post('/', formData);
export const updateCategory = (id, formData) => API.put(`/${id}`, formData);
export const deleteCategory = (id) => API.delete(`/${id}`);
