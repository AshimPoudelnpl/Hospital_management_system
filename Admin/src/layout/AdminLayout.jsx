import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';

const AdminLayout = () => {
  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen">
      <div className="flex items-start">
        <Sidebar />

        <section className="main-content w-full px-6">
          {/* Page content */}
          <div className="my-6 px-2">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
