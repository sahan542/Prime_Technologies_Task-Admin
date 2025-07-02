'use client'; // This ensures the component is treated as a client-side component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';  // Import AuthContext to access token
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation for Next.js 13
import { toast } from 'react-toastify';  // Import toast for notifications
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

const UsersPage = () => {
  // const { token } = useAuth();  // Get the token from AuthContext
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Access Token from Redux:", token);


  const router = useRouter();  // Use useRouter for navigation

useEffect(() => {
  if (!token) return; // 🚫 Skip if token is still null (rehydration not complete)

  setLoading(true);


    // Fetch users from the backend API with authorization token
    axios
      .get('http://localhost:8000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then((response) => {
        setUsers(response.data);  // Set the users state with the fetched data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch users'); // Handle any errors that occur during the fetch
        setLoading(false);
      });
  }, [token]); // Fetch users whenever token changes

  const handleDeleteUser = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    axios
      .delete(`http://localhost:8000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then(() => {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== id));
        toast.success('User deleted successfully!');
      })
      .catch((err) => {
        setError('Failed to delete user');
        console.error(err);
      });
  };

const handleToggleAdminStatus = (id: number) => {
  const user = users.find((user) => user.id === id);
  if (!user) return;

  // Toggle the admin status
  const newAdminStatus = !user.is_admin;  // If true, set it to false, if false, set it to true

  axios
    .put(
      `http://localhost:8000/api/admin/users/${id}/admin-status`,
      { is_admin: newAdminStatus },  // Send the updated admin status in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      }
    )
    .then(() => {
      // Update the user list with the new admin status
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, is_admin: newAdminStatus } : user
        )
      );
      toast.success(newAdminStatus ? 'User is now an admin' : 'User is no longer an admin');
    })
    .catch((err) => {
      setError('Failed to update admin status');
      console.error(err);
    });
};


  const handleExportUsers = () => {
    // Trigger the export of the user list as CSV
    axios
      .get('http://localhost:8000/api/admin/users/export', {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
        },
        responseType: 'blob', // Expect the response as a blob (for downloading CSV)
      })
      .then((response) => {
        // Create a URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        // Set the link's download attribute to specify the file name
        link.href = url;
        link.setAttribute('download', 'users.csv');

        // Append the link to the document body and trigger a click to start download
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link after download is initiated
        document.body.removeChild(link);
      })
      .catch((err) => {
        setError('Failed to export users');
        console.error(err);
      });
  };

  if (loading) return <div className="text-black">Loading...</div>;
  if (error) return <div className="text-black">{error}</div>;

  return (
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
              <td className="border px-4 py-2 text-black text-center align-middle">{user.id}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">{user.email}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">
                <button
                  className={`${
                    user.is_admin ? 'bg-green-500' : 'btn-primary-new'
                  } text-white px-4 py-2 rounded`}
                  onClick={() => handleToggleAdminStatus(user.id)}
                >
                  {user.is_admin ? 'Revoke Admin' : 'Make Admin'}
                </button>
              </td>
              <td className="border px-4 py-2 text-black text-center align-middle">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 btn-primary-new"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
