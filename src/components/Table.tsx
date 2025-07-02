'use client';
import React from "react";

const Table = () => {
  const rows = [
    {
      id: 1,
      name: "Product #1",
      productId: "id000001",
      quantity: 20,
      price: "$80.00",
      customer: "Patricia J. King",
      status: "InTransit",
    },
    {
      id: 2,
      name: "Product #2",
      productId: "id000002",
      quantity: 12,
      price: "$25.00",
      customer: "Rachel J. Wicker",
      status: "Delivered",
    },
    {
      id: 3,
      name: "Product #3",
      productId: "id000003",
      quantity: 23,
      price: "$820.00",
      customer: "Michael K. Ledford",
      status: "Delivered",
    },
    {
      id: 4,
      name: "Product #4",
      productId: "id000004",
      quantity: 34,
      price: "$340.00",
      customer: "Michael K. Ledford",
      status: "Delivered",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.productId}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.customer}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
