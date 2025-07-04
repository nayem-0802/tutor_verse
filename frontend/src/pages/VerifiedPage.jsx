import React from 'react';
import Navbar from '../components/Navbar';

const VerifiedPage = () => {

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6 mt-10 bg-white rounded-md shadow-md border">
          <h2 className="text-2xl font-semibold text-[#70B44A] mb-4">Email Verified!</h2>
          <p className="text-gray-700 mb-4">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <a
            href="/login"
            className="inline-block bg-[#70B44A] text-white px-6 py-2 rounded-md hover:bg-[#5a983b]"
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPage;
