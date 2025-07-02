'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';  // Import AuthContext to access token
import { useRouter } from 'next/router';  // Import useRouter from next/router
import { toast } from 'react-toastify';  // Import toast for notifications

const EditProduct = () => {
  const { token } = useAuth();  // Get the token from AuthContext
  const router = useRouter();  // Use useRouter for navigation
  const { id } = router.query;  // Get the product ID from the query string

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
    benefits: string[];  // Explicitly define `benefits` as `string[]`
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

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the product details using the product ID from URL
  useEffect(() => {
    if (!id) return;  // If no id is available, don't try fetching

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);  // Populate the product state with the fetched data
      } catch (err) {
        toast.error('Failed to fetch product details.');
        console.error(err);
      }
    };

    fetchProduct();  // Fetch the product data
  }, [id, token]);  // Only run when `id` or `token` changes

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
    formData.append('cloud_name', 'dtzx6gxfh'); 

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dtzx6gxfh/image/upload',
        formData
      );
      
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
      await axios.put(`http://localhost:8000/api/admin/products/${id}/edit`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product updated successfully!');
      router.push('/products');  // Redirect to products page after updating
    } catch (err) {
      toast.error('Failed to update product');
      setError('Failed to update product');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
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
            className="border px-4 py-2 w-full"
            required
          />
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
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default EditProduct;
