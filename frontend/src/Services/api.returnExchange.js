import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

// const authToken = localStorage.getItem("user");

export const exchange_req = (data) => API.post("/api/exchange-request", data);
export const return_req = (data) => API.post("/api/return-request", data);