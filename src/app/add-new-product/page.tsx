'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';  // Import AuthContext to access token
import { useRouter } from 'next/navigation';  // Import useRouter for navigation
import { toast } from 'react-toastify';  // Import toast for notifications
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const AddNewProduct = () => {
  const router = useRouter();
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
    benefits: string[];  // Explicitly define benefits as string[]
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
    benefits: [],  // Benefits is now explicitly typed as string[]
    visible: true,
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
    const token = useSelector((state: RootState) => state.auth.token);
    console.log("Access Token from Redux:", token);

  // Handle input change for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle benefits change (array input)
  const handleBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProduct({
      ...product,
      benefits: value.split(',').map((benefit) => benefit.trim()),
    });
  };

  // Handle image upload (Cloudinary)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mern_product'); 
    formData.append('cloud_name', 'dtzxxgxfh'); // Replace with your cloud name

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dtzx6gxfh/image/upload',
        formData
      );
      
      // Extract the image URL from the response
      const imageUrl = res.data.secure_url; 
      setProduct({ ...product, img: imageUrl });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Image upload failed.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle visibility toggle
  const handleToggleVisibility = () => {
    setProduct({ ...product, visible: !product.visible });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending the product with the image URL (from Cloudinary) and authorization token
      await axios.post('http://localhost:8000/api/admin/products/', product, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the headers
        },
      });
      toast.success('Product added successfully!');
      router.push('/products'); // Redirect to products page after adding a product
    } catch (err) {
      toast.error('Failed to add product');
      setError('Failed to add product');
      setLoading(false);
    }
  };

  return (
    <div className="text-black overflow-y-auto max-h-[90vh] w-full hide-scrollbar">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
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
            placeholder="Enter product title"
            className="border px-4 py-2 w-full placeholder-gray-300"
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
            placeholder="Enter description"
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
            placeholder="Enter product price"
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
            placeholder="Enter original price"
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            placeholder="Enter Category"
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            placeholder="Enter brand name"
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Benefits (comma separated)</label>
          <input
            type="text"
            name="benefits"
            value={product.benefits.join(', ')} // Corrected to use join() on the array
            onChange={handleBenefitsChange}
            placeholder="Enter benifits"
            className="border px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Product Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="border px-4 py-2 w-full"
            accept="image/*"
          />
          {loading && <div>Uploading Image...</div>}
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={product.visible}
              onChange={handleToggleVisibility}
              className="mr-2"
            />
            Is Visible
          </label>
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default AddNewProduct;
