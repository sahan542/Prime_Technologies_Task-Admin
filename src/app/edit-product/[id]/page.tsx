'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; 
import { toast } from 'react-toastify';  
import axiosInstance from '@/app/api/axiosInstance';
import { API_ENDPOINTS } from '@/app/api/endpoints';
import PrivateRoute from '@/components/PrivateRoute';

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams(); 

  const [product, setProduct] = useState<{
    slug: string;
    title: string;
    description: string;
    price: string;
    original_price: string;
    category: string;
    brand: string;
    img: string | null;
    sold_recently: number;
    benefits: string[]; 
    visible: boolean;
  }>({
    slug: '',
    title: '',
    description: '',
    price: '',
    original_price: '',
    category: '',
    brand: '',
    img: null,
    sold_recently: 0,
    benefits: [],
    visible: true,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

useEffect(() => {
  if (!id) return;

  const fetchProduct = async () => {
    try {
      const productId = Number(id);

      const response = await axiosInstance.get(API_ENDPOINTS.GET_PRODUCT_BYID.replace("${id}", productId.toString()));

      setProduct(response.data); 
    } catch (err) {
      toast.error('Failed to fetch product details.');
      console.error(err);
    }
  };

  fetchProduct();
}, [id]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProduct({
      ...product,
      benefits: value.split(',').map((benefit) => benefit.trim()),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

    const productId = Number(id); // Parse userIdEdit to a number

    // Check if the productId is a valid number
    if (isNaN(productId)) {
      toast.error("Invalid product ID");
      return;
    }
      await axiosInstance.put(API_ENDPOINTS.EDIT_PRODUCT_BYID.replace("${id}", productId.toString()), product
);
      toast.success('Product updated successfully!');
      router.push('/products'); 
    } catch (err) {
      toast.error('Failed to update product');
      setError('Failed to update product');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PrivateRoute>
    <div className="text-black overflow-y-auto max-h-[90vh] w-full hide-scrollbar">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2">Product Slug</label>
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Product Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Original Price</label>
          <input
            type="number"
            name="original_price"
            value={product.original_price}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="SKIN CARE">SKIN CARE</option>
            <option value="CLENSERS">CLENSERS</option>
            <option value="MOISTURIZORS">MOISTURIZORS</option>
            <option value="SERUMS">SERUMS</option>
            <option value="TONERS">TONERS</option>
            <option value="SUNSCREENS">SUNSCREENS</option>
            <option value="EYE & LIP CARE">EYE & LIP CARE</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Brand</label>
          <select
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            className="border px-4 py-2 w-full"
            required
          >
            <option value="" disabled>Select Brand</option>
            <option value="Nature's Secrets">Nature's Secrets</option>
            <option value="Prevense">Prevense</option>
            <option value="Intense">Intense</option>
            <option value="British Co">British Co</option>
            <option value="Sisili">Sisili</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Benefits (comma separated)</label>
          <input
            type="text"
            name="benefits"
            value={product.benefits.join(', ')}
            onChange={handleBenefitsChange}
            className="border px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
    </PrivateRoute>
  );
};

export default EditProduct;
