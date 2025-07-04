import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFDF7]">
      <Navbar />

      <main className="flex-grow bg-white">
        {!user ? (
          <>
            {/* Public View */}
            <section className="px-4 py-16 bg-white">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2 text-center md:text-left">
                  <h1 className="text-4xl sm:text-5xl font-serif text-[#000000] mb-4">
                    Empowering Learning, Connecting Minds
                  </h1>
                  <p className="text-gray-600 text-lg mb-6">
                    Welcome to TutorVerse — your trusted partner for finding the best tutors and guides across Bangladesh.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a
                      href="/login"
                      className="bg-[#70B44A] text-white px-6 py-2 rounded-md hover:bg-[#5a983b] transition"
                    >
                      Login
                    </a>
                    <a
                      href="/registration"
                      className="border border-[#70B44A] text-[#70B44A] px-6 py-2 rounded-md hover:bg-[#f3fff1] transition"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>

                <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  <div className="p-6 border rounded-xl shadow-md bg-[#FBFDF7] text-center">
                    <h3 className="text-xl font-semibold text-[#70B44A] mb-2">Find Tutors</h3>
                    <p className="text-gray-600 text-sm">
                      Search for tutors based on subject, location, or experience.
                    </p>
                  </div>
                  <div className="p-6 border rounded-xl shadow-md bg-[#FBFDF7] text-center">
                    <h3 className="text-xl font-semibold text-[#70B44A] mb-2">Become a Tutor</h3>
                    <p className="text-gray-600 text-sm">
                      Share your knowledge and earn by helping students grow.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-4 py-16 bg-[#FBFDF7] text-center">
              <h2 className="text-3xl font-bold text-[#70B44A] mb-4">Why TutorVerse?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Whether you're a student looking for expert guidance or a tutor ready to share your knowledge,
                TutorVerse is the bridge that connects both. We believe in accessible, quality education for all.
              </p>
            </section>
          </>
        ) : (
          <>
            {/* Users View */}
            <section className="px-4 py-16 bg-white">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#70B44A] mb-6">
                  Welcome to TutorVerse!
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                  You're logged in. Explore the tools and services to help you learn, teach, and connect.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  <div className="bg-[#FBFDF7] p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-[#70B44A] mb-2">Search Posts</h3>
                    <p className="text-sm text-gray-600">Browse student requests or tutor offers and find your match.</p>
                  </div>
                  <div className="bg-[#FBFDF7] p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-[#70B44A] mb-2">Post a Job</h3>
                    <p className="text-sm text-gray-600">Post your tutoring needs or share your availability to teach.</p>
                  </div>
                  <div className="bg-[#FBFDF7] p-6 rounded-xl shadow hover:shadow-md transition">
                    <h3 className="text-xl font-semibold text-[#70B44A] mb-2">Manage Profile</h3>
                    <p className="text-sm text-gray-600">Update your details, view reviews, or become a guide.</p>
                  </div>
                </div>

                <div className="mt-10">
                  <a
                    href="/profile"
                    className="inline-block bg-[#70B44A] text-white px-8 py-2 rounded-md font-semibold hover:bg-[#5ca13d] transition"
                  >
                    Go to Profile
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;