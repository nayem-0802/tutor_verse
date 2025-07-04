import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    window.location.href = '/';
  }

  const isProfile = location.pathname === '/profile';

  return (
    <nav className="bg-[#FBFDF7] border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-3xl font-bold text-[#70B44A]">TutorVerse</span>
          <span className="text-xs text-gray-500 -mt-1">Your trusted tutor partner</span>
        </div>

        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-black text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden sm:flex space-x-6 font-semibold text-sm text-black items-center">
          <li><a href="/" className="hover:text-green-600">Home</a></li>
          <li><a href="/aboutus" className="hover:text-green-600">About us</a></li>
          <li><a href="/service" className="hover:text-green-600">Services</a></li>

          {user && !isProfile ? (
            <ul className="hidden sm:flex space-x-5 font-normal text-sm text-black items-center">
              <li>
                <a href="/profile">
                  <FaUserCircle className="text-2xl text-[#70B44A]" />
                </a>
              </li>
              <li>
                <button className="border border-[#70B44A] bg-[#FDFAF6] px-2 rounded-sm text-black font-normal hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            </ul>

          ) : (
            <>
            </>
          )}
        </ul>
      </div>

      {isOpen && (
        <ul className="sm:hidden px-4 pb-4 space-y-2 font-medium text-sm text-black">
          <li><a href="/" className="block hover:text-green-600">Home</a></li>
          <li><a href="/aboutus" className="block hover:text-green-600">About us</a></li>
          <li><a href="/service" className="block hover:text-green-600">Services</a></li>

          {user && !isProfile ? (
            <ul className="sm:hidden pb-4 space-y-2 font-medium text-sm text-black">
              <li>
                <a href="/profile">
                  <FaUserCircle className="text-2xl text-[#70B44A]" />
                </a>
              </li>
              <li>
                <button className="border border-[#70B44A] bg-[#FDFAF6] px-2 rounded-sm text-black font-normal hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            </ul>
          ) : (
            <>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
