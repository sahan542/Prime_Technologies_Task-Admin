"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import PrivateRoute from "@/components/PrivateRoute";
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import DeleteUserModal from "@/components/modals/DeleteUserModal";

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = useSelector((state: RootState) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      setLoading(true);

      try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS, {
          params: { page: currentPage, limit: 8 },
        });

        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data.users)) {
            setUsers(data.users);
            setTotalPages(data.totalPages);
          } else {
            console.error("Received data is not an array:", data);
          }
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleExportUsers = () => {
    axiosInstance
      .get(API_ENDPOINTS.EXPORT_ALL_USERS, {
        responseType: "blob", 
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "users.csv"); 

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      })
      .catch((err) => {
        setError("Failed to export users");
        console.error(err);
      });
  };

const handleDeleteUser = async () => {
  if (userIdToDelete === null) return;

  try {
    const userId = Number(userIdToDelete);

    if (isNaN(userId)) {
      toast.error("Invalid user ID");
      return;
    }

    const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_USER.replace("${id}", userId.toString()));

    if (response.status === 204) {
      setUsers(users.filter((user) => user.id !== userId)); 
      toast.success("User deleted successfully.");
    } else {
      console.error("Failed to delete the user:", response);
      toast.error("Failed to delete the user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    const errorMessage = error.response?.data?.message || "Error deleting the user.";
    toast.error(errorMessage);
  } finally {
    setIsModalOpen(false);
  }
};



  const handleToggleAdminStatus = async (id: number) => {
    const user = users.find((user) => user.id === id);
    if (!user) return;

    const newAdminStatus = !user.is_admin;

    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.TOGGLE_ADMIN_STATUS.replace("${id}", id.toString()),
        {
          is_admin: newAdminStatus,
        }
      );

      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, is_admin: newAdminStatus } : user
          )
        );
        toast.success(
          newAdminStatus ? "User is now an admin" : "User is no longer an admin"
        );
      } else {
        setError("Failed to update admin status");
        console.error("Response not OK:", response);
      }
    } catch (err) {
      setError("Failed to update admin status");
      console.error("Error updating admin status:", err);
    }
  };

  const openDeleteModal = (id: number) => {
    setUserIdToDelete(id);
    setIsModalOpen(true); 
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Close delete confirmation modal without deletion
  };

  if (loading) return <div className="text-black">Loading...</div>;

  if (error) return <div className="text-black">{error}</div>;

  return (
    <PrivateRoute>
      <div className="text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Users</h2>
          <div>
            <button
              onClick={handleExportUsers}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Export User List
            </button>
          </div>
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-black">ID</th>
              <th className="border px-4 py-2 text-black">Email</th>
              <th className="border px-4 py-2 text-black">Admin</th>
              <th className="border px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {user.id}
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {user.email}
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  <button
                    className={`${
                      user.is_admin ? "bg-green-500" : "btn-primary-new"
                    } text-white px-4 py-2 rounded`}
                    onClick={() => handleToggleAdminStatus(user.id)}
                  >
                    {user.is_admin ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  <button
                    onClick={() => openDeleteModal(user.id)}
                    className="text-red-500 btn-primary-new"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
          onConfirm={handleDeleteUser}
        />
      </div>
    </PrivateRoute>
  );
};

export default UsersPage;
