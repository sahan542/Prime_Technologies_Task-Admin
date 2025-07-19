"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaTrash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import SignInModal from "@/components/modals/SignInModal";
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import PrivateRoute from "@/components/PrivateRoute";
import { toast } from "react-toastify";
import DeleteUserModal from "@/components/modals/DeleteUserModal";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  first_name: string;
  last_name: string;
  street_address: string;
  apartment: string;
  city: string;
  phone: string;
  email: string;
  shipping_method: string;
  shipping_cost: number;
  service_fee: number;
  total_amount: number;
  payment_method: string;
  status: string;
  payment_status: string;
  items: OrderItem[];
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // For Delete Confirmation Modal
  const [orderIdToDelete, setOrderIdToDelete] = useState<number | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Access Token from Redux:", token);

  const fetchOrders = async () => {
    if (!token) {
      setOpenSignInModal(true);
      return;
    }

    setLoading(true);

try {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_ADMIN_ORDERS, {
    params: { page: currentPage, limit: 8 },
  });

  if (response.status === 200) {
    const data = await response.data;

    if (Array.isArray(data.orders)) {
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } else {
      console.error("Received data is not an array:", data);
    }
  } else {
    console.error("Failed to fetch orders:", response.statusText);
  }
} catch (error) {
  console.error("Error fetching orders:", error);
}

  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handleToggleStatus = async (orderId: number) => {
    const order = orders.find((order) => order.id === orderId);
    if (!order || order.status !== "Pending") return;

    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Shipped" } : o
    );
    setOrders(updatedOrders);

    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "Shipped",
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update order status:", response.statusText);
        setOrders(orders);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setOrders(orders);
    }
  };

  const handleTogglePaymentStatus = async (orderId: number) => {
    const order = orders.find((order) => order.id === orderId);
    if (!order || order.payment_status !== "Unpaid") return;

    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, payment_status: "Paid" } : o
    );
    setOrders(updatedOrders);

    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.PAYMENT_STATUS_UPDATE.replace(
          "${orderId}",
          orderId.toString()
        ),
        {}
      );

      if (response.status === 200) {
        toast.success("Payment status updated successfully!");
      } else {
        console.error("Failed to update payment status:", response.statusText);
        toast.error("Failed to update payment status.");
        setOrders(orders);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      setOrders(orders);
    }
  };

  const handleDeleteOrder = async () => {
    if (orderIdToDelete === null) return;

    try {
      const orderId = Number(orderIdToDelete);

      if (isNaN(orderId)) {
        toast.error("Invalid order ID");
        return;
      }

      const response = await axiosInstance.delete(
        API_ENDPOINTS.DELETE_ORDER.replace("${orderId}", orderId.toString())
      );

      if (response.status === 200) {
        setOrders(orders.filter((order) => order.id !== orderIdToDelete));
        toast.success("Order deleted successfully.");
      } else {
        console.error("Failed to delete the order:", response.statusText);
        toast.error("Failed to delete the order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting the order.");
    } finally {
      setIsModalOpen(false); // Close the modal after the action
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openDeleteModal = (orderId: number) => {
    setOrderIdToDelete(orderId);
    setIsModalOpen(true); // Open delete confirmation modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Close delete confirmation modal without deletion
  };

  return (
    <PrivateRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-[#7b1f4b]">Orders</h1>
        <div className="overflow-y-auto max-h-[75vh] w-full">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-black text-black">
                  Order ID
                </th>
                <th className="px-4 py-2 border border-black text-black">
                  Customer Name
                </th>
                <th className="px-4 py-2 border border-black text-black">
                  Status
                </th>
                <th className="px-4 py-2 border border-black text-black">
                  Total Amount
                </th>
                <th className="px-4 py-2 border border-black text-black">
                  Payment Status
                </th>
                <th className="px-4 py-2 border border-black text-black">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border border-black text-black text-center align-middle">
                    {order.id}
                  </td>
                  <td className="px-4 py-2 border border-black text-black text-center align-middle">
                    {order.full_name}
                  </td>
                  <td className="px-4 py-2 border border-black text-black text-center align-middle">
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border border-black text-black text-center align-middle">
                    Rs {order.total_amount}
                  </td>
                  <td className="px-4 py-2 border border-black text-black text-center align-middle">
                    {order.payment_status === "Unpaid" ? (
                      <button
                        className="ml-2 text-white bg-[#7b1f4b] px-4 py-2 rounded-md"
                        onClick={() => handleTogglePaymentStatus(order.id)}
                      >
                        Mark as Paid
                      </button>
                    ) : (
                      <span className="text-black font-bold">Paid</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-black text-black text-center align-middle">
                    <button className="text-[#7b1f4b] mr-3">
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openDeleteModal(order.id)}
                      className="text-[#7b1f4b]"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-l"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-r"
          >
            Next
          </button>
        </div>

        <DeleteUserModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteOrder}
        />

        {openSignInModal && (
          <SignInModal
            isOpen={openSignInModal}
            closeModal={() => setOpenSignInModal(false)}
          />
        )}
      </div>
    </PrivateRoute>
  );
};

export default OrdersPage;
