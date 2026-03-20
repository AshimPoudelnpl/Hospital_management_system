import Dashboard from "../pages/Dashboard";
import Doctors from "../pages/Doctors";
import Departments from "../pages/Departments";
import Services from "../pages/Services";
import Appointments from "../pages/Appointments";
import Notices from "../pages/Notices";
import Contacts from "../pages/Contacts";
import Profile from "../pages/Profile";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "doctors",
    element: <Doctors />,
  },
  {
    path: "departments",
    element: <Departments />,
  },
  {
    path: "services",
    element: <Services />,
  },
  {
    path: "appointments",
    element: <Appointments />,
  },
  {
    path: "notices",
    element: <Notices />,
  },
  {
    path: "contacts",
    element: <Contacts />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
