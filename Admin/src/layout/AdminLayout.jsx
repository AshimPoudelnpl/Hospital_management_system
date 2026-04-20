import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f9]">
      <div className="flex min-h-screen items-start">
        <Sidebar />

        <section className="main-content min-w-0 flex-1 pt-16 lg:pt-0">
          <div className="pb-4 lg:pb-6">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
