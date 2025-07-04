import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      <main className="flex-grow px-4 sm:px-10 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#70B44A] mb-5">About TutorVerse</h1>
          <p className="text-lg text-gray-600 mb-6">
            <span className="font-semibold text-gray-700">TutorVerse</span> is a tution media platform that connects students with tutors
            across Bangladesh. Through direct connection, fair practice, and full openness. Our goal is simple: make education accessible without any middlemen,
            media fees, or hidden charges.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-3 text-[#70B44A]">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            Many social platforms charge extra fees to connect students and tutors. TutorVerse breaks that chain. We provide a direct
            communication system between learners and educators — no media syndicates, no commission cuts, and no unnecessary hassle.
            Education should be direct, affordable, and dignified.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-3 text-[#70B44A]">How We Work</h2>
          <ul className="text-left list-disc list-inside space-y-2 max-w-2xl mx-auto text-gray-600">
            <li>No middlemen. Students hire tutors directly.</li>
            <li>No media fees. Everything is transparent.</li>
            <li>Both students and tutors are reviewed for safety.</li>
            <li>Tutors can block/report suspicious users anytime.</li>
            <li>We continuously improve by listening to our users and tutors.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-6 text-[#70B44A]">Team Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-gray-700">
            <div className="bg-[#FBFDF7] p-4 rounded-xl shadow-md text-center">
              <p className="font-semibold text-lg">MD Abul Hasan Nayem</p>
              <p className="text-sm">CSE, Leading University</p>
            </div>
            <div className="bg-[#FBFDF7] p-4 rounded-xl shadow-md text-center">
              <p className="font-semibold text-lg">Shahriar Hossen Shuyeb</p>
              <p className="text-sm">CSE, Leading University</p>
            </div>
            <div className="bg-[#FBFDF7] p-4 rounded-xl shadow-md text-center">
              <p className="font-semibold text-lg">Sujon Pal</p>
              <p className="text-sm">CSE, Leading University</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUsPage;
