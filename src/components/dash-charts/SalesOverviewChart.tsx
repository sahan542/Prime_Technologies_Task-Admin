'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const SalesOverviewChart = () => {
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],  
    datasets: [
      {
        label: 'Total Sales (USD)',
        data: [1200, 1500, 1800, 2000, 2500, 2300, 2700], 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
    text: 'Sales Overview (Last 7 Days)',  // Title text
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
      <Bar data={salesData} options={options} />
    </div>
  );
};

export default SalesOverviewChart;
