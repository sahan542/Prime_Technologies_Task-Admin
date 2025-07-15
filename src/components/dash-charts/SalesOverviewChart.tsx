'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useEffect, useState } from 'react';

// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const SalesOverviewChart = () => {
    const [salesData, setSalesData] = useState([]);
    const [profitData, setProfitData] = useState([]);



    useEffect(() => {
    // Fetching data from the backend API
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/admin/sales/last-seven-days');  
        const data = await response.json();
        const adjustedData = data.map(value => value !== 0 ? value - 50 : value);
        setProfitData(adjustedData);
        
        // Set the data for the chart
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);


  console.log("adjusted values : ",profitData);
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],  
    datasets: [
      {
        label: 'Total Sales (Rs)',
        data: salesData, 
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesOverviewChart;
