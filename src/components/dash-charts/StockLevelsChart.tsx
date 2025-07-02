'use client'; // Ensure this is a client-side component

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import ApexCharts and set ssr: false to load only on the client-side
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const StockLevelsChart = () => {
  const options = {
    chart: {
      type: 'pie',
      height: '100%',
    },
    title: {
      text: 'Stock Levels',
      align: 'center',
      font: {
      size: 25,  // Increase the font size (adjust as needed)
      weight: 'bold',  // Make the title bold (optional)
    },

    },
    labels: ['In Stock', 'Low Stock', 'Out of Stock'], // Replace with actual stock categories
  };

  const series = [70, 20, 10]; // Example data, replace with actual stock data

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ApexCharts options={options} series={series} type="pie" height="100%" />
    </div>
  );
};

export default StockLevelsChart;
