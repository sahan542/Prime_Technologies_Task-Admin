'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation"; 
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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
    const token = useSelector((state: RootState) => state.auth.token);
    console.log("Access Token from Redux:", token);





  const router = useRouter();  // Use useRouter from next/navigation

  useEffect(() => {
    if (!token) return; // 🚫 Skip if token is still null (rehydration not complete)

    setLoading(true);

    // Fetch products from the backend API with authorization token
    axios
      .get("http://localhost:8000/api/admin/products/", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Set the products state with the fetched data
        } else {
          setError("Invalid product data format");  // Handle unexpected data formats
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch products"); // Handle any errors that occur during the fetch
        setLoading(false);
      });
  }, [token]); // Fetch products whenever token changes

  const handleAddNewProduct = () => {
    // Redirect to the Add New Product page
    router.push("/add-new-product");
  };

const handleExportProducts = () => {
  // Trigger the export of the product list as CSV
  axios
    .get("http://localhost:8000/api/admin/products/export", {
      headers: {
        Authorization: `Bearer ${token}`,  // Add Authorization header with Bearer token
      },
      responseType: "blob",  // Expect the response as a blob (for downloading CSV)
    })
    .then((response) => {
      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      // Set the link's download attribute to specify the file name
      link.href = url;
      link.setAttribute("download", "products.csv");

      // Append the link to the document body and trigger a click to start download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link after download is initiated
      document.body.removeChild(link);
    })
    .catch((err) => {
      // Handle any errors that may occur during the request
      setError("Failed to export products");
      console.error(err);
    });
};


  const handleDeleteProduct = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    axios
      .delete(`http://localhost:8000/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then(() => {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => {
        setError("Failed to delete product");
        console.error(err);
      });
  };

const handleEditProduct = (id: number) => {
  // Redirect to the Edit Product page
  router.push(`/edit-product/${id}`);  // This will handle the redirection
};


  if (loading) return <div className="text-black">Loading...</div>;
  if (error) return <div className="text-black">{error}</div>;

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div>
          <button
            onClick={handleAddNewProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Add New Product
          </button>
          <button
            onClick={handleExportProducts}
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
                <button className="text-blue-500" onClick={() => handleEditProduct(product.id)}>Edit</button> |{" "}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProductsPage;
