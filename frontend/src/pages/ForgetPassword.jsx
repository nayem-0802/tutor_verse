import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';


const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', formData.email)
      .single();

    if (!existingUser) {
      setError("This email deos not exist.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: 'http://localhost:5173/updatepass',
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password reset email has been sent. Please check your inbox.');
      }
    } catch {
      setError('Something went wrong! Try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="bg-[#FBFDF6] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-2">
            <span className="text-[#70B44A]">Reset</span> your <span className="text-black">Password</span>
          </h2>
          <p className="text-sm text-center text-[#3A3A3A] mb-6">
            Enter your email to receive a password reset link.
          </p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {message && <p className="text-[#70B44A] text-sm text-center mb-4">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] bg-[#FDFAF6]"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-1/2 border border-[#70B44A] bg-[#FDFAF6] px-6 py-1.5 rounded-md text-[#000000] font-semibold hover:cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-black mt-4">
            Remember password?{' '}
            <a href="/login" className="text-[#70B44A] font-semibold hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );

}

export default ForgetPassword;
