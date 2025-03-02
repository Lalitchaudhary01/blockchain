import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Token from localStorage
        if (!token) {
          console.error("No token found, please log in");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="p-6 bg-black min-h-screen text-white flex justify-center items-center">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-400">User Profile</h2>
        <p className="text-gray-300 mt-2">Your account details</p>

        {/* Profile Card */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : user ? (
            <>
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <p className="text-gray-400 mt-1">{user.email}</p>
            </>
          ) : (
            <p className="text-red-500">Failed to load profile</p>
          )}
        </div>

        {/* Edit Profile Button */}
        <button className="mt-6 bg-green-500 text-black py-2 px-6 rounded-lg hover:bg-green-400">
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default Profile;
