'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importing useRouter

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">Product Reviews</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-y-auto max-h-[75vh] w-full">

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Review</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="border px-4 py-2">{review.id}</td>
              <td className="border px-4 py-2">{review.product_id}</td>
              <td className="border px-4 py-2">{review.user_name}</td>
              <td className="border px-4 py-2">{review.rating}</td>
              <td className="border px-4 py-2">{review.comment}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500">Edit</button> | <button className="text-red-500">Delete</button>
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
