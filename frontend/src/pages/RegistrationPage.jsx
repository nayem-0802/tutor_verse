import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';

const Registration = () => {

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    role: '',
    address: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
  const nameRegex = /^([a-zA-Z_\s]){5,20}/;
  const numberRegex = /^(\+88)?01[3-9]\d{8}/;
  const addressRegex = /^([a-zA-Z0-9,\-/\s]){8,}/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);


    if (!nameRegex.test(formData.full_name)) {
      setError("Name must be at least 5 letters and contain only valid characters.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }

    if (!numberRegex.test(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!addressRegex.test(formData.address)) {
      setError("Address must be at least 8 character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', formData.email)
      .single();

    if (existingUser) {
      setError("This email is already registered. Please login.");
      return;
    }


    localStorage.setItem('profileInfo', JSON.stringify({
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      role: formData.role,
      address: formData.address,
    }));

    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: 'http://localhost:5173/verified',
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      alert('Check your email to verify your account.');
      window.location.href = '/login';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="bg-[#FBFDF6] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-2">
            <span className="text-[#70B44A]">Welcome</span> to <span className="text-black">TutorVerse</span>
          </h2>
          <p className="text-sm text-center text-[#3A3A3A] mb-6">
            Join us now to continue your journey.
          </p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {['full_name', 'email', 'phone', 'address'].map((field, index) => (
              <div className="mb-3" key={index}>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field}
                  className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] bg-[#FDFAF6]"
                  required
                />
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A]  bg-[#FDFAF6]"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="confirm Password"
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] bg-[#FDFAF6]"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <div className="flex gap-3 justify-center">

                  <select className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] focus:border-[#70B44A] bg-[#FDFAF6]"
                    name='gender' onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <div className="flex gap-3 justify-center flex-wrap">

                  <select className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] focus:border-[#70B44A] bg-[#FDFAF6]"
                    name='role' onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Tutor">Tutor</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full sm:w-1/2 border border-[#70B44A] bg-[#FDFAF6] px-6 py-1.5 rounded-md text-[#000000] font-semibold hover:cursor-pointer"
              >
                Signup
              </button>
            </div>

            <p className="text-center text-sm text-black my-2">or</p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => (window.location.href = '/login')}
                className="bg-[#70B44A] w-full sm:w-1/2 text-white px-6 py-1.5 rounded-md hover:bg-[#5a983b] hover:cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
