import axios from "axios";
import { store } from "../../redux/store"; 
import { toast } from "react-toastify";
import { useRouter } from "next/router"; 

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const exp = payload?.exp; 

    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error("Error parsing token", error);
    return true;
  }
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();  
    const token = state.auth.token;  

    if (token && isTokenExpired(token)) {
      console.log("Token has expired. Redirecting to login.");
      store.dispatch({ type: 'auth/removeAuthToken' });  
      localStorage.removeItem("token");  
      localStorage.removeItem("moTeAccessToken");  
      localStorage.removeItem("persist:moTeAuth");  
      localStorage.removeItem("loglevel");  
      window.location.href = "/signin"; 
      return Promise.reject("Token expired");
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;  
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Redirecting to login.");
      store.dispatch({ type: 'auth/removeAuthToken' });
      localStorage.removeItem("token"); 
      toast.error("Session expired. Please log in again.");
      window.location.href = "/signin";  
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
