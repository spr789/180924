"use client"; // Ensure this component runs on the client

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import from next/navigation
import { login } from '../../services/auth/login';
import LoginForm from '../components/auth/LoginForm';

const AuthLoginContainer: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (phoneNumber: string, password: string) => {
    setError('');
    console.log('Login attempt initiated.');

    try {
      const response = await login(phoneNumber, password);
      console.log('Login response received:', response);

      if (response.token) {
        localStorage.setItem('token', response.token); // Store token
        console.log('Token stored in localStorage:', response.token);
        router.push('/'); // Redirect to home page
        console.log('Redirecting to home page...');
      } else {
        console.log('No token received.');
        setError('Login failed. No token received.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <LoginForm onLogin={handleLogin} />
        <div className="mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
          <p className="text-sm">
            Forgot your password?{' '}
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Reset it
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginContainer;
