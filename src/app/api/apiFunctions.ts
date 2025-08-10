import axiosInstance from "../api/axiosInstance"; 
import { API_ENDPOINTS } from "./endpoints";

const fetchOrders = async (token: string, currentPage: number) => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.GET_ADMIN_ORDERS}?page=${currentPage}&limit=8`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const updateOrderStatus = async (token: string, orderId: number, status: string) => {
  try {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.STATUS_CHANGE}/${orderId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

const deleteOrder = async (token: string, orderId: number) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.DELETE_ORDER}/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export default {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
