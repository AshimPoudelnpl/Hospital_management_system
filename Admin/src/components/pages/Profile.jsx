import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-slate-800">Profile</h1>

      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-slate-800">{user?.email || "Admin"}</p>
            <p className="text-sm text-slate-500">Administrator</p>
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div>
            <p className="text-xs font-medium text-gray-500">User ID</p>
            <p className="break-all text-sm text-slate-800">{user?.id || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Email</p>
            <p className="break-all text-sm text-slate-800">{user?.email || "-"}</p>
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
