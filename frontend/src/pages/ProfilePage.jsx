import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaUserCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [activeTab, setActiveTab] = useState("Profile");

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const savedUser = localStorage.getItem('user');
                const savedProfile = localStorage.getItem('profile');

                if (savedUser && savedProfile) {
                    setUser(JSON.parse(savedUser));
                    setProfile(JSON.parse(savedProfile));
                    return;
                }

                const { data: { user }, error } = await supabase.auth.getUser();
                if (error || !user) {
                    console.error("User fetch error:", error?.message);
                    window.location.href = '/login';
                    return;
                }

                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));

                const { data: profile, error: profileError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError) {
                    console.error("Profile fetch error:", profileError.message);
                    return;
                }

                setProfile(profile);
                localStorage.setItem('profile', JSON.stringify(profile));
            } catch (err) {
                console.error("Unexpected error:", err.message);
            }
        };

        loadUserData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
        setUser(null);
        setProfile(null);
        window.location.href = '/';
    };


    const tabs = [
        { label: "Profile", key: "Profile" },
        { label: "Post a Job", key: "PostJob" },
        { label: "My Post", key: "MyPost" },
        { label: "Setting", key: "Setting" }
    ];

    return (
        <div className="min-h-screen bg-[#FBFDF7] flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-60 bg-[#F9FFF5] border-r border-gray-300 p-4 flex flex-col justify-between">
                    <div>

                        <ul className="space-y-2">
                            {tabs.map((tab) => (
                                <li key={tab.key}>
                                    <button
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`w-full text-left px-3 py-1 rounded-md transition ${activeTab === tab.key
                                            ? 'bg-[#70B44A] text-white font-semibold'
                                            : 'text-black hover:bg-gray-100'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-red-500 px-3 py-1 hover:bg-red-100 rounded-md"
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex-1 flex flex-col items-center justify-start bg-[#FFFCFA] p-8">
                    <FaUserCircle className="text-7xl text-[#70B44A] mb-4" />

                    <h2 className="text-2xl font-semibold mb-1">{profile?.full_name || "Loading..."}</h2>
                    <p className="text-gray-600 mb-1">{user?.email || "Loading..."}</p>
                    <p className="text-gray-600 mb-1">{profile?.phone}</p>
                    <p className="text-gray-600 mb-4">{profile?.address}</p>

                    <button
                        className="border border-[#70B44A] px-5 py-0.5 rounded-md hover:bg-[#70B44A] hover:text-white transition"
                    >
                        Edit
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;
