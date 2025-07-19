'use client';

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importing useRouter
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import SignInModal from '@/components/modals/SignInModal'; // Ensure this import is correct
import DeleteUserModal from "@/components/modals/DeleteUserModal";
import PrivateRoute from "@/components/PrivateRoute";
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { toast } from "react-toastify";

interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  brand: string;
  img: string | null;
  sold_recently: number;
  benefits: string[];
  created_at: string;
  updated_at: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null); // ID of product to delete
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();  // Use useRouter for navigation

  // useEffect(() => {
  //   if (!token) {
  //     setOpenSignInModal(true); // Show sign-in modal if no token
  //     return; // Skip fetch if token is missing
  //   }

  //   const fetchProducts = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await axios.get("http://localhost:8000/api/admin/products/products", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: { page: currentPage, limit: 8 }, // Send query params page and limit
  //       });

  //       if (response.data) {
  //         setProducts(response.data.products); // Set the products state
  //         setTotalPages(response.data.totalPages);  // Set total pages
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch products");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [token, currentPage]); 


  useEffect(() => {
  if (!token) {
    setOpenSignInModal(true); // Show sign-in modal if no token
    return; // Skip fetch if token is missing
  }

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PRODUCTS, {
          params: { page: currentPage, limit: 8 },
      });

      if (response.data) {
        setProducts(response.data.products); // Set the products state
        setTotalPages(response.data.totalPages);  // Set total pages
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [token, currentPage]);


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);  // Update current page
    }
  };


const handleDeleteProduct = (id: number) => {
    setProductIdToDelete(id); // Set the product ID to be deleted
    setIsModalOpen(true); // Open the modal
  };

const handleConfirmDelete = async () => {
  if (productIdToDelete === null) return;

  try {
    const productId = Number(productIdToDelete);
    const url = API_ENDPOINTS.DELETE_PRODUCT_BYID.replace("${productIdToDelete}", productId.toString() );

    // Make the DELETE request using axiosInstance
    const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_PRODUCT_BYID.replace("${productIdToDelete}", productId.toString()));
    if (response.status === 200) {
      setProducts(products.filter((product) => product.id !== productId)); 
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

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal on cancel
  };

  if (loading) return <div className="text-black">Loading...</div>;
  if (error) return <div className="text-black">{error}</div>;

  return (
  <PrivateRoute>

    <div className="text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div>
          <button
            onClick={() => router.push("/add-new-product")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Add New Product
          </button>
          <button
            onClick={() => router.push("/export-products")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export Product List
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-black">ID</th>
              <th className="border px-4 py-2 text-black">Product Name</th>
              <th className="border px-4 py-2 text-black">Price</th>
              <th className="border px-4 py-2 text-black">Category</th>
              <th className="border px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2 text-black text-center align-middle">{product.id}</td>
                <td className="border px-4 py-2 text-black text-center align-middle">{product.title}</td>
                <td className="border px-4 py-2 text-black text-center align-middle">${product.price}</td>
                <td className="border px-4 py-2 text-black text-center align-middle">{product.category}</td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  <button className="text-[#7b1f4b]" onClick={() => router.push(`/edit-product/${product.id}`)}>
                    <FaEdit />
                  </button> |{" "}
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
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
      <div className="flex justify-center mt-4">
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

      {/* Show the modal if it's open */}
      <DeleteUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Show Sign In Modal if token is missing */}
      {openSignInModal && (
        <SignInModal
          isOpen={openSignInModal}
          closeModal={() => setOpenSignInModal(false)} // Close modal when user logs in
        />
      )}
    </div>

  </PrivateRoute>
  );
};

export default ProductsPage;

