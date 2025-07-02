'use client'; // Ensure this is a client-side component

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RevenueOverviewChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Replace with actual data
    datasets: [
      {
        label: 'Revenue (USD)',
        data: [1200, 1500, 1800, 2200, 2500, 2000, 2700], // Example data, replace with actual revenue data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit (USD)',
        data: [300, 500, 700, 800, 1000, 900, 1100], 
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
        text: 'Revenue and Profit Overview (Last 7 Days)',  
        font: {
          size: 20,  
          weight: 'bold',  
        },
        color: 'black',  
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueOverviewChart;
