'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const OrderDispatchChart = () => {
  const options = {
    chart: {
      type: 'pie',
      height: '100%',
      zoom: {
        enabled: false,
      },
    },
    title: {
        text: 'Order Dispatch Status',  // Title text
        align: 'center',  // Align the title to the center
        style: {
        fontSize: '20px',  // Increase font size (adjust as needed)
        fontWeight: 'bold',  // Make the title bold (optional)
        color: 'black',  // Change the text color to black
        },
    },
    labels: ['Pending Dispatch', 'Dispatched', 'In Transit'], 
  };

  const series = [45, 25, 30];

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ApexCharts options={options} series={series} type="pie" height="100%" />
    </div>
  );
};

export default OrderDispatchChart;
