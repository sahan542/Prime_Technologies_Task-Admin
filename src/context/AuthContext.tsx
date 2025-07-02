'use client';  // Ensure this is a client component

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define a more flexible User type
interface User {
  email: string;
  name?: string;  // You can extend this as needed
  [key: string]: any;  // Add more fields if needed (e.g., role, permissions)
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (token: string, userData: User) => void;  // Accept user data along with the token
  signOut: () => void;
  isAuthenticated: boolean;  // Property to check if the user is authenticated
  isSignupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to wrap the application with context values
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Track the user's data and authentication token
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false); // Track modal state

  // Get the token from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Store user data in state
    }
  }, []);

  // SignIn function to set the user and token (using decoded JWT or API data)
  const signIn = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);  // Set the user data

    // Store the token and user in localStorage
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  // SignOut function to clear the user and token
  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  // Functions to control the signup modal state
  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  // Determine if the user is authenticated based on the presence of a token
  const isAuthenticated = !!token;  // If token exists, the user is authenticated

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        isAuthenticated,  // Provide the isAuthenticated flag
        isSignupOpen,
        openSignup,
        closeSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
