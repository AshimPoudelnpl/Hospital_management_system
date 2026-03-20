import HomePage from "../components/pages/HomePage";
import Services from "../components/pages/Services";
import Doctors from "../components/pages/Doctors";
import Departments from "../components/pages/Departments";
import Specialists from "../components/pages/Specialists";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import BookAppointment from "../components/pages/BookAppointment";
import Notice from "../components/pages/Notice";

const PublicRoutes = [
  { index: true, element: <HomePage /> },
  { path: "services", element: <Services /> },
  { path: "services/:slug", element: <Services /> },
  { path: "doctors", element: <Doctors /> },
  { path: "departments", element: <Departments /> },
  { path: "specialists", element: <Specialists /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "book-appointment", element: <BookAppointment /> },
  { path: "notice", element: <Notice /> },
];

export default PublicRoutes;
