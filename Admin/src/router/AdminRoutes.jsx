import Dashboard from "../components/pages/Dashboard";
import Doctors from "../components/pages/Doctors";
import Departments from "../components/pages/Departments";
import Services from "../components/pages/Services";
import Appointments from "../components/pages/Appointments";
import Notices from "../components/pages/Notices";
import Contacts from "../components/pages/Contacts";
import Profile from "../components/pages/Profile";

export const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "doctors", element: <Doctors /> },
  { path: "departments", element: <Departments /> },
  { path: "services", element: <Services /> },
  { path: "appointments", element: <Appointments /> },
  { path: "notices", element: <Notices /> },
  { path: "contacts", element: <Contacts /> },
  { path: "profile", element: <Profile /> },
];
