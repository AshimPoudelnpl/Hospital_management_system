import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation, useChangePasswordMutation } from "../../Redux/features/authSlice";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [profileData, setProfileData] = useState({ email: user?.email || "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Profile Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <FormInput
              placeholder="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
            <Button
              type="submit"
              variant="primary"
              isLoading={isUpdatingProfile}
              loadingText="Updating..."
              className="w-full sm:w-auto"
            >
              Update Profile
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <FormInput
              placeholder="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
            <FormInput
              placeholder="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            <FormInput
              placeholder="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
            <Button
              type="submit"
              variant="primary"
              isLoading={isChangingPassword}
              loadingText="Changing..."
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mt-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500">Email</p>
            <p className="text-sm text-slate-800">{user?.email || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Role</p>
            <p className="text-sm text-slate-800">Administrator</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Account Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
