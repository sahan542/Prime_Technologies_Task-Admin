'use client';
import React from "react";

interface CardProps {
  title: string;
  value: string;
  percentage?: string;
}

const Card: React.FC<CardProps> = ({ title, value, percentage }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-semibold text-gray-800">{value}</span>
        {percentage && (
          <span
            className={`text-sm ${
              percentage.startsWith("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {percentage}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
