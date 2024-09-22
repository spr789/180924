// components/auth/LoginForm.tsx
"use client"; // Add this at the top

import { useState } from 'react';

interface LoginFormProps {
  onLogin: (phoneNumber: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(phoneNumber, password);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="phone-number" className="block text-sm font-medium">Phone Number:</label>
        <input
          type="text"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
