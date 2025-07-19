// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'; // Importing useRouter
// import { FaTrash } from "react-icons/fa6";
// import { FaEye } from "react-icons/fa";
// import SignInModal from '@/components/modals/SignInModal'; // Import the SignInModal component

// interface Review {
//   id: number;
//   rating: number;
//   comment: string;
//   product_id: number;
//   user_name: string;
//   is_public: boolean;
//   created_at: string;
//   updated_at?: string;
// }

// const ReviewsPage = () => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [openSignInModal, setOpenSignInModal] = useState<boolean>(false); // State for the SignInModal
//   const token = useSelector((state: RootState) => state.auth.token);

//   const router = useRouter(); // Now this will work because it's in a client component

//   useEffect(() => {
//     if (!token) {
//       setOpenSignInModal(true); // Show the SignInModal if token is missing
//       return; // Skip fetching reviews if token is not present
//     }

//     setLoading(true);

//     // Fetch reviews from the backend API with authorization token
//     axios
//       .get("http://localhost:8000/api/admin/reviews", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//         },
//       })
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setReviews(response.data); // Set the reviews state with the fetched data
//         } else {
//           setError("Invalid product data format");  // Handle unexpected data formats
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to fetch reviews"); // Handle any errors that occur during the fetch
//         setLoading(false);
//       });
//   }, [token]);

//   const handleDeleteReview = async (reviewId: number) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this review?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:8000/api/admin/reviews/${reviewId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // Use the token for authentication
//         },
//       });

//       if (response.ok) {
//         setReviews(reviews.filter((review) => review.id !== reviewId));
//         alert("Review deleted successfully.");
//       } else {
//         console.error("Failed to delete the review:", response.statusText);
//         alert("Failed to delete the review.");
//       }
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       alert("Error deleting the review.");
//     }
//   };

//   const handlePublicStatus = async (reviewId: number) => {
//     // Find the review by ID
//     const review = reviews.find((review) => review.id === reviewId);
//     if (!review) return; // If the review doesn't exist, do nothing

//     // Toggle is_public status
//     const updatedIsPublic = review.is_public === false ? true : false;

//     // Optimistically update the UI to toggle public status
//     const updatedReviews = reviews.map((o) =>
//       o.id === reviewId ? { ...o, is_public: updatedIsPublic } : o
//     );
//     setReviews(updatedReviews);

//     try {
//       const response = await fetch(`http://localhost:8000/api/admin/reviews/${reviewId}?is_public=${updatedIsPublic}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // Make sure token is defined elsewhere
//         },
//       });

//       if (!response.ok) {
//         console.error("Failed to update public status:", response.statusText);
//         // Revert changes if update failed
//         setReviews(reviews);
//       }
//     } catch (error) {
//       console.error("Error updating public status:", error);
//       // Revert changes if error occurred
//       setReviews(reviews);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">Product Reviews</h2>
//       {loading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       <div className="overflow-y-auto max-h-[75vh] w-full">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2 text-black">ID</th>
//               <th className="border px-4 py-2 text-black">Product</th>
//               <th className="border px-4 py-2 text-black">User</th>
//               <th className="border px-4 py-2 text-black">Rating</th>
//               <th className="border px-4 py-2 text-black">Review</th>
//               <th className="border px-4 py-2 text-black">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((review) => (
//               <tr key={review.id}>
//                 <td className="border px-4 py-2 text-black text-center align-middle">{review.id}</td>
//                 <td className="border px-4 py-2 text-black text-center align-middle">{review.product_id}</td>
//                 <td className="border px-4 py-2 text-black text-center align-middle">{review.user_name}</td>
//                 <td className="border px-4 py-2 text-black text-center align-middle">{review.rating}</td>
//                 <td className="border px-4 py-2 text-black text-center align-middle">
//                   {review.comment}
//                   {review.is_public === false && (
//                     <button
//                       className="ml-2 text-white bg-[#7b1f4b] px-4 py-2 rounded-md"
//                       onClick={() => handlePublicStatus(review.id)}
//                     >
//                       Make Public
//                     </button>
//                   )}
//                 </td>
//                 <td className="px-4 py-2 border border-black text-black text-center align-middle">
//                   <button className="text-[#7b1f4b] mr-3"><FaEye /></button>
//                   <button className="text-[#7b1f4b]" onClick={() => handleDeleteReview(review.id)}><FaTrash /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Show Sign In Modal if token is missing */}
//       {openSignInModal && (
//         <SignInModal
//           isOpen={openSignInModal}
//           closeModal={() => setOpenSignInModal(false)} // Close modal when user logs in
//         />
//       )}
//     </div>
//   );
// };

// export default ReviewsPage;

"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import SignInModal from "@/components/modals/SignInModal"; // Import the SignInModal component
import { API_ENDPOINTS } from "../api/endpoints";
import axiosInstance from "../api/axiosInstance";
import PrivateRoute from "@/components/PrivateRoute";
import DeleteUserModal from "@/components/modals/DeleteUserModal";
import { toast } from "react-toastify";

interface Review {
  id: number;
  rating: number;
  comment: string;
  product_id: number;
  user_name: string;
  is_public: boolean;
  created_at: string;
  updated_at?: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false); // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);

useEffect(() => {
  const fetchReviews = async () => {
    if (!token) {
      setOpenSignInModal(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_REVIEWS, {
        params: { page: currentPage, limit: 8 },
      });

      if (response.status === 200) {
        const data = response.data;

        if (Array.isArray(data.reviews)) {
          setReviews(data.reviews);
          setTotalPages(data.totalPages);
        } else {
          console.error("Received data is not an array:", data);
        }
      } else {
        console.error("Failed to fetch reviews:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();
}, [token, currentPage]);


  const handleDeleteReview = async () => {
  if (reviewIdToDelete === null) return;

  try {
    const reviewId = Number(reviewIdToDelete);

    if (isNaN(reviewId)) {
      toast.error("Invalid user ID");
      return;
    }

    const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_REVIEW_BYID.replace("${reviewId}", reviewId.toString()));

    if (response.status === 204) {
      setReviews(reviews.filter((review) => review.id !== reviewId)); 
      toast.success("Review deleted successfully.");
    } else {
      console.error("Failed to delete the review:", response);
      toast.error("Failed to delete the review.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    const errorMessage = error.response?.data?.message || "Error deleting the review.";
    toast.error(errorMessage);
  } finally {
    setIsModalOpen(false);
  }
  };

const handlePublicStatus = async (reviewId: number) => {
  const review = reviews.find((review) => review.id === reviewId);
  if (!review) return;

  const updatedIsPublic = !review.is_public;
  const updatedReviews = reviews.map((o) =>
    o.id === reviewId ? { ...o, is_public: updatedIsPublic } : o
  );
  setReviews(updatedReviews);

  try {
    // Construct the updated URL dynamically with reviewId and updatedIsPublic
    const url = API_ENDPOINTS.UPDATE_REVIEW_PUBLIC_STATUS
      .replace("${reviewId}", reviewId.toString())
      .replace("${updatedIsPublic}", updatedIsPublic.toString());

    // Make PATCH request using axiosInstance
    const response = await axiosInstance.patch(url);

    if (response.status !== 200) {
      console.error("Failed to update public status:", response.statusText);
      setReviews(reviews); // Revert changes if update fails
    }
  } catch (error) {
    console.error("Error updating public status:", error);
    setReviews(reviews); // Revert changes in case of an error
  }
};


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openDeleteModal = (id: number) => {
    setReviewIdToDelete(id);
    setIsModalOpen(true); 
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <PrivateRoute>
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">
        Product Reviews
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-black">ID</th>
              <th className="border px-4 py-2 text-black">Product</th>
              <th className="border px-4 py-2 text-black">User</th>
              <th className="border px-4 py-2 text-black">Rating</th>
              <th className="border px-4 py-2 text-black">Review</th>
              <th className="border px-4 py-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {review.id}
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {review.product_id}
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {review.user_name}
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {review.rating}
                </td>
                <td className="border px-4 py-2 text-black text-center align-middle">
                  {review.comment}
                </td>
                <td className="px-4 py-2 border border-black text-black text-center align-middle">
                  <div className="flex items-center gap-2 mx-8">
                    <div className="flex items-center justify-center w-1/2">
                      <button
                        className="text-[#7b1f4b] w-full"
                        onClick={() => openDeleteModal(review.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Make Public Button */}
                    {review.is_public === false ? (
                      <button
                        className="text-white bg-[#7b1f4b] w-full px-4 py-2 rounded-md"
                        onClick={() => handlePublicStatus(review.id)}
                      >
                        Make Public
                      </button>
                    ) : (
                      <p>Public</p>
                    )}
                  </div>
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
          onConfirm={handleDeleteReview}
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

export default ReviewsPage;
