import { useState } from "react";

const ProfileSettings = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <section id="profile" className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Profile Settings</h2>
          <p className="text-gray-600">
            Manage your account information and security settings
          </p>
        </header>

        {/* Profile Info Card */}
        <div className="bg-white rounded-lg border border-gray-300 mb-8">
          <div className="p-6 border-b border-gray-300 flex items-center">
            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold text-white">
              JS
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-900">
                John Smith
              </h3>
              <p className="text-gray-600">Member since February 2024</p>
            </div>
          </div>
          <form className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="input"
                defaultValue="John"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input"
                defaultValue="Smith"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input"
                defaultValue="john.smith@example.com"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <input
              type="text"
              placeholder="Bitcoin Wallet Address"
              className="input"
              defaultValue="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            />
            <button type="submit" className="btn">
              Save Changes
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg border border-gray-300 mb-8 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Security Settings
          </h3>
          {/* Change Password */}
          <div className="pb-6 border-b border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-900">Password</h4>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-orange-500"
              >
                Change
              </button>
            </div>
            {showPasswordForm && (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="input"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="input"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="input"
                />
                <button className="btn-dark">Update Password</button>
              </div>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <div className="pb-6 border-b border-gray-300 flex justify-between items-center">
            <h4 className="text-lg font-medium text-gray-900">
              Two-Factor Authentication
            </h4>
            <input
              type="checkbox"
              className="toggle"
              checked={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            />
          </div>

          {/* Login History */}
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Recent Login Activity
          </h4>
          <div className="space-y-4">
            <p className="text-sm text-gray-900">
              Chrome on Windows - New York, USA - 2024-02-20 14:30
            </p>
            <p className="text-sm text-gray-900">
              Safari on iPhone - New York, USA - 2024-02-19 09:15
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
