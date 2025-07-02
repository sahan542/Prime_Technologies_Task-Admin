'use client'; 
import React, { useState, useEffect } from 'react';

const PendingOrdersCard = () => {



  return (
<div className="flex justify-between gap-4">
  <div className="dashboard-card flex-1">
    <h3 className="text-xl font-semibold text-[#7b1f4b]">Pending Orders</h3>
    <p className="text-4xl font-bold text-center mt-2 text-black">14</p>
  </div>

  <div className="dashboard-card flex-1">
    <h3 className="text-xl font-semibold text-[#7b1f4b]">Completed Orders</h3>
    <p className="text-4xl font-bold text-center mt-2 text-black">47</p>
  </div>

  <div className="dashboard-card flex-1">
    <h3 className="text-xl font-semibold text-[#7b1f4b]">Revenue</h3>
    <p className="text-4xl font-bold text-center mt-2 text-black">$7690</p>
  </div>
</div>


  );
};

export default PendingOrdersCard;
