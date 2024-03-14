import axios from "axios";

import { VITE_BACKEND_URL } from "@/config";

const newRequest = axios.create({
  baseURL: VITE_BACKEND_URL || "http://localhost:8000/api/v1/",
  withCredentials: true,
});

export default newRequest;
