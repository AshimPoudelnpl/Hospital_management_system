import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-800">{user?.email || "Admin"}</p>
            <p className="text-sm text-slate-500">Administrator</p>
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div>
            <p className="text-xs font-medium text-gray-500">User ID</p>
            <p className="text-sm text-slate-800">{user?.id || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Email</p>
            <p className="text-sm text-slate-800">{user?.email || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Role</p>
            <p className="text-sm text-slate-800">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
