import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const menuitems = [
  { label: "Services", link: "/services" },
  { label: "Doctors", link: "/doctors" },
  { label: "Departments", link: "/departments" },
  { label: "Specialists", link: "/specialists" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname;

  const closeMenus = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 flex border-b border-gray-300 bg-white min-h-[70px] tracking-wide relative z-50 shadow-md">
      <div className="w-full flex items-center gap-6 sm:px-10 px-6 py-3 justify-between">
        {/* Logo */}
        <a href="/" className="flex flex-col items-center">
          <img src={logo} alt="logo" className="w-[60px]" />
          <span className="text-lg font-bold">
            <span className="text-blue-700">Swastik</span> <span className="text-blue-900">Hospital</span>
          </span>
        </a>

        {/* Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed top-3 right-4 z-[100] bg-white w-9 h-9 rounded-full border flex items-center justify-center"
          >
            <FaTimes />
          </button>

          <ul className="lg:flex lg:ml-10 lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md z-50">
            {/* Mobile Logo */}
            <li className="lg:hidden pb-4 flex flex-col items-center">
              <img src={logo} alt="logo" className="w-28" />
              <span className="text-lg font-bold mt-1">
                <span className="text-blue-700">Swastik</span> <span className="text-blue-900">Hospital</span>
              </span>
            </li>
            <li>
              <Link 
                to="/" 
                onClick={closeMenus}
                className={`font-medium pb-1 border-b-2 transition-colors ${
                  activeTab === "/"
                    ? "text-secondary-color border-secondary-color"
                    : "text-primary-color border-transparent"
                }`}
              >
                Home
              </Link>
            </li>
            {menuitems.map(({ label, link }) => (
              <li key={label}>
                <Link 
                  to={link} 
                  onClick={closeMenus}
                  className={`font-medium pb-1 border-b-2 transition-colors ${
                    activeTab === link
                      ? "text-secondary-color border-secondary-color"
                      : "text-primary-color border-transparent"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Book Appointment Button */}
        <a href="/book-appointment" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
          Book Appointment
        </a>

        {/* Mobile Open */}
        <button onClick={() => setMenuOpen(true)} className="ml-auto lg:hidden">
          <FaBars size={22} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;