import React, { useState } from 'react';
import {supabase} from '../supabaseClient';
import Navbar from '../components/Navbar';


const UpdatePassword = () => {

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password updated successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="bg-[#FBFDF6] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-4 text-[#70B44A]">
            Reset Your Password
          </h2>

          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center mb-3">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] bg-[#FDFAF6]"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-1/2 border border-[#70B44A] bg-[#FDFAF6] px-6 py-1.5 rounded-md text-[#000000] font-semibold hover:cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-black mt-4">
            Remembered your password?{' '}
            <a href="/login" className="text-[#70B44A] font-semibold hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

