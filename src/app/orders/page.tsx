"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaTrash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";



// Define the structure for an individual order item
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Define the structure for a single order
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

  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Access Token from Redux:", token);

  // Fetch orders from the API (replace with your API endpoint)
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return; // 🚫 Skip if token is still null (rehydration not complete)

      setLoading(true);

      try {
        const response = await fetch("http://localhost:8000/api/admin/orders", {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          }
        });

        if (response.ok) {
          const data = await response.json();

          // Check if the response is an array
          if (Array.isArray(data)) {
            setOrders(data);
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

    fetchOrders();
  }, [token]);

  // Handle toggling order status from "Pending" to "Shipped"
  const handleToggleStatus = async (orderId: number) => {
    const order = orders.find((order) => order.id === orderId);
    if (!order || order.status !== "Pending") return; // Only allow toggle if status is "Pending"

    // Optimistically update the UI to "Shipped"
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Shipped" } : o
    );
    setOrders(updatedOrders);

    try {
      const response = await fetch(`http://localhost:8000/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "Shipped",  // Ensure correct status casing
        }),
      });

      if (!response.ok) {
        console.error("Failed to update order status:", response.statusText);
        // Revert to previous status if backend fails
        setOrders(orders);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      // Revert to previous status if error occurs
      setOrders(orders);
    }
  };

const handleTogglePaymentStatus = async (orderId: number) => {
  const order = orders.find((order) => order.id === orderId);
  if (!order || order.payment_status !== "Unpaid") return; // Only allow toggle if payment status is "Unpaid"

  // Optimistically update the UI to "Paid"
  const updatedOrders = orders.map((o) =>
    o.id === orderId ? { ...o, payment_status: "Paid" } : o
  );
  setOrders(updatedOrders);

  try {
    const response = await fetch(`http://localhost:8000/api/admin/orders/${orderId}/payment_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to update payment status:", response.statusText);
      // Revert to previous status if backend fails
      setOrders(orders);
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    // Revert to previous status if error occurs
    setOrders(orders);
  }
};

// Function to handle deleting the order
const handleDeleteOrder = async (orderId: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:8000/api/admin/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Use the token for authentication
      },
    });

    if (response.ok) {
      // Optimistically update the UI to remove the order
      setOrders(orders.filter((order) => order.id !== orderId));
      alert("Order deleted successfully.");
    } else {
      console.error("Failed to delete the order:", response.statusText);
      alert("Failed to delete the order.");
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("Error deleting the order.");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#7b1f4b]">Orders</h1>
      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-black text-black">Order ID</th>
              <th className="px-4 py-2 border border-black text-black">Customer Name</th>
              <th className="px-4 py-2 border border-black text-black">Status</th>
              <th className="px-4 py-2 border border-black text-black">Total Amount</th>
              <th className="px-4 py-2 border border-black text-black">Payment Status</th>
              <th className="px-4 py-2 border border-black text-black">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border border-black text-black text-center align-middle">{order.id}</td>
                <td className="px-4 py-2 border border-black text-black text-center align-middle">
                  {order.full_name} 
                </td>
                <td className="px-4 py-2 border border-black text-black text-center align-middle">
                  {order.status}
                  {order.status === "Pending" && (
                    <button
                      className="ml-2 text-white bg-[#7b1f4b] px-4 py-2 rounded-md"
                      onClick={() => handleToggleStatus(order.id)}
                    >
                      Mark as Shipped
                    </button>
                  )}
                </td>
                <td className="px-4 py-2 border border-black text-black text-center align-middle">Rs {order.total_price}</td>
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
                  <button className="text-[#7b1f4b] mr-3"><FaEye /></button>
                  
                  <button className="text-[#7b1f4b]" onClick={() => handleDeleteOrder(order.id)}><FaTrash /></button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
