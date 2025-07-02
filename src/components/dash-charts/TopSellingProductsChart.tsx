'use client'; // Ensure this is a client-side component

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TopSellingProductsChart = () => {
  const productData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'], // Replace with actual product names
    datasets: [
      {
        label: 'Units Sold',
        data: [500, 300, 450, 700, 350], // Example units sold, replace with actual data
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
plugins: {
  title: {
    display: true,
    text: 'Top Selling Products',  // Title text
    font: {
      size: 20,  // Increase the font size (adjust as needed)
      weight: 'bold',  // Make the title bold (optional)
    },
    color: 'black',  // Change the text color to black
  },
},
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={productData} options={options} />
    </div>
  );
};

export default TopSellingProductsChart;
