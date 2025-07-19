// components/PrivateRoute.tsx
'use client';  // <-- Mark this file as a client component

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';  // Adjust the import if necessary
import { useRouter } from 'next/navigation';  // Use next/navigation in Next.js 13+ (app directory)

interface PrivateRouteProps {
  children: React.ReactNode;  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);  
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  useEffect(() => {

    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false);  
      router.push("/signin"); 
    }
  }, [token, router]);

  if (!isAuthenticated) {
    return <></>;  
  }

  return <>{children}</>;  
};

export default PrivateRoute;
