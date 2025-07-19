import React from "react";
import PrivateRoute from "../../components/PrivateRoute"; 

const Dashboard: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        <h1>Welcome to the Dashboard!</h1>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
