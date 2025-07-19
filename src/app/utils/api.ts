// src/utils/api.ts

export const signUpUser = async (username: string, password: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return await response.json();
};

export const signInUser = async (email: string, password: string) => {
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const data = await response.json();

  const token = data.access_token;
  if (token) {
    // Save token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');  // Optionally store authentication status
    return data;  // Return the response data (can be used for further processing)
  } else {
    throw new Error('Token not received from server');
  }
};

