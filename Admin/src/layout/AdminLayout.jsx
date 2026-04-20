import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';

const AdminLayout = () => {
  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen">
      <div className="flex items-start">
        <Sidebar />

        <section className="main-content w-full px-3 sm:px-4 md:px-6 lg:ml-0">
          {/* Page content */}
          <div className="my-4 sm:my-6 px-1 sm:px-2">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
