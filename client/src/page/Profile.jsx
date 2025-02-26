import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // Simulating API call - Replace with actual API fetch
    setTimeout(() => {
      setUser({
        name: "John Doe", // Replace with API data
        email: "john.doe@example.com", // Replace with API data
      });
    }, 1000);
  }, []);

  return (
    <section className="p-6 bg-black min-h-screen text-white flex justify-center items-center">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-400">User Profile</h2>
        <p className="text-gray-300 mt-2">Your account details</p>

        {/* Profile Card */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-white">
            {user.name || "Loading..."}
          </h3>
          <p className="text-gray-400 mt-1">{user.email || "Loading..."}</p>
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
