'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importing useRouter
import { FaTrash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

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
  const [error, setError] = useState<string>('');
  const token = useSelector((state: RootState) => state.auth.token);

  const router = useRouter(); // Now this will work because it's in a client component

  useEffect(() => {
    if (!token) return; // 🚫 Skip if token is still null (rehydration not complete)

    setLoading(true);

    // Fetch reviews from the backend API with authorization token
    axios
      .get("http://localhost:8000/api/admin/reviews", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setReviews(response.data); // Set the reviews state with the fetched data
        } else {
          setError("Invalid product data format");  // Handle unexpected data formats
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch reviews"); // Handle any errors that occur during the fetch
        setLoading(false);
      });
  }, [token]);

  const handleDeleteReview = async (reviewId: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:8000/api/admin/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Use the token for authentication
      },
    });

    if (response.ok) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
      alert("review deleted successfully.");
    } else {
      console.error("Failed to delete the review:", response.statusText);
      alert("Failed to delete the review.");
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    alert("Error deleting the review.");
  }
};

const handlePublicStatus = async (reviewId: number) => {
  // Find the review by ID
  const review = reviews.find((review) => review.id === reviewId);
  if (!review) return; // If the review doesn't exist, do nothing

  // Toggle is_public status, no need for a specific check on the existing status here
  const updatedIsPublic = review.is_public === "true" ? "false" : "true";

  // Optimistically update the UI to toggle public status
  const updatedReviews = reviews.map((o) =>
    o.id === reviewId ? { ...o, is_public: updatedIsPublic } : o
  );
  setReviews(updatedReviews);

  try {
    const response = await fetch(`http://localhost:8000/api/admin/reviews/${reviewId}?is_public=${updatedIsPublic}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Make sure token is defined elsewhere
      },
    });

    if (!response.ok) {
      console.error("Failed to update public status:", response.statusText);
      // Revert changes if update failed
      setReviews(reviews);
    }
  } catch (error) {
    console.error("Error updating public status:", error);
    // Revert changes if error occurred
    setReviews(reviews);
  }
};


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">Product Reviews</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-y-auto max-h-[75vh] w-full">

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2  text-black">ID</th>
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
              <td className="border px-4 py-2 text-black text-center align-middle">{review.id}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">{review.product_id}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">{review.user_name}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">{review.rating}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">
                {review.comment} 
                {review.is_public === false && (
                  <button
                    className="ml-2 text-white bg-[#7b1f4b] px-4 py-2 rounded-md"
                    onClick={() => handlePublicStatus(review.id)}
                  >
                    make Public
                  </button>
                )}
              </td>
              <td className="px-4 py-2 border border-black text-black text-center align-middle">
                  <button className="text-[#7b1f4b] mr-3"><FaEye /></button>
                  
                  <button className="text-[#7b1f4b]" onClick={() => handleDeleteReview(review.id)}><FaTrash /></button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ReviewsPage;
