import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (loginError) {
      return setError(loginError.message);
    }

    const user = data.user;

    const { data: profileData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();


    if (!profileData) {
      const stored = JSON.parse(localStorage.getItem('profileInfo'));

      if (!stored) {
        return setError("No profile info found. Please re-register.");
      }

      const insertData = {
        id: user.id,
        ...stored
      };

      const { error: insertError } = await supabase.from('users').insert(insertData);

      if (insertError) {
        return setError("Login success but profile creation failed: " + insertError.message);
      }

      localStorage.removeItem('profileInfo');
      alert("Login & Profile setup successful!");
      navigate('/');
    } else {
      alert("Login successful!");
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="bg-[#FBFDF6] p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-xl font-bold text-center mb-2">
            <span className="text-[#70B44A]">Welcome Back</span> to <span className="text-black">TutorVerse</span>
          </h2>
          <p className="text-sm text-center text-[#3A3A3A] mb-6">
            Please login to continue your journey.
          </p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] bg-[#FDFAF6]"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border border-[#BEBDBD] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#70B44A] bg-[#FDFAF6]"
                required
              />
            </div>

            <div className="flex justify-end mb-4">
              <a href="/forgetpass" className="text-sm text-[#70B44A] hover:underline">
                Forgot Password?
              </a>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full sm:w-1/2 border border-[#70B44A] bg-[#FDFAF6] px-6 py-1.5 rounded-md text-[#000000] font-semibold hover:cursor-pointer"
              >
                Login
              </button>
            </div>

            <p className="text-center text-sm text-black my-2">or</p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => (window.location.href = '/registration')}
                className="bg-[#70B44A] w-full sm:w-1/2 text-white px-6 py-1.5 rounded-md hover:bg-[#5a983b] hover:cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;