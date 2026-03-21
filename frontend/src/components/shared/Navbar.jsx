import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetDepartmentsQuery } from "@Redux/features/departmentSlice.js";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Services", link: "/services" },
  { label: "Doctors", link: "/doctors" },
  { label: "Departments", link: "/departments", hasDropdown: true },
  { label: "Specialists", link: "/specialists" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname;

  const { data: departments } = useGetDepartmentsQuery();

  const closeAll = () => {
    setMenuOpen(false);
    setDeptOpen(false);
  };

  return (
    <header className="sticky top-0 flex border-b border-gray-300 bg-white min-h-[70px] tracking-wide z-50 shadow-md">
      <div className="w-full flex items-center gap-6 sm:px-10 px-6 py-3 justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center" onClick={closeAll}>
          <img src={logo} alt="logo" className="w-[60px]" />
          <span className="text-lg font-bold leading-tight">
            <span className="text-blue-700">Swastik</span>{" "}
            <span className="text-blue-900">Hospital</span>
          </span>
        </Link>

        {/* Desktop & Mobile Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          {/* Mobile close button */}
          <button
            onClick={closeAll}
            className="lg:hidden fixed top-3 right-4 z-[100] bg-white w-9 h-9 rounded-full border flex items-center justify-center"
          >
            <FaTimes />
          </button>

          <ul className="lg:flex lg:items-center lg:gap-x-8 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-y-auto z-50">

            {/* Mobile logo */}
            <li className="lg:hidden pb-4 flex flex-col items-center border-b border-gray-100">
              <img src={logo} alt="logo" className="w-20" />
              <span className="text-base font-bold mt-1">
                <span className="text-blue-700">Swastik</span>{" "}
                <span className="text-blue-900">Hospital</span>
              </span>
            </li>

            {navLinks.map(({ label, link, hasDropdown }) => (
              <li key={label} className="relative group">
                {hasDropdown ? (
                  <>
                    {/* Desktop: hover dropdown */}
                    <button
                      onClick={() => setDeptOpen(!deptOpen)}
                      className={`font-medium pb-1 border-b-2 transition-colors flex items-center gap-1 ${
                        active.startsWith("/departments")
                          ? "text-blue-600 border-blue-600"
                          : "text-blue-900 border-transparent hover:text-blue-600"
                      }`}
                    >
                      {label}
                      <FaChevronDown className="text-xs" />
                    </button>

                    {/* Desktop dropdown on hover */}
                    <ul className="lg:absolute lg:top-full lg:left-0 lg:bg-white lg:shadow-xl lg:rounded-lg lg:mt-2 lg:min-w-[200px] lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:transition-all lg:border lg:border-gray-100 max-lg:pl-4 max-lg:mt-2 max-lg:space-y-1 z-50"
                      style={{ display: deptOpen ? undefined : undefined }}
                    >
                      <li>
                        <Link
                          to="/departments"
                          onClick={closeAll}
                          className="block px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 border-b border-gray-100"
                        >
                          All Departments
                        </Link>
                      </li>
                      {(departments || []).map((dept) => (
                        <li key={dept.id}>
                          <Link
                            to={`/departments?id=${dept.id}`}
                            onClick={closeAll}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          >
                            {dept.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile dropdown toggle */}
                    <ul className={`max-lg:pl-4 max-lg:mt-1 max-lg:space-y-1 lg:hidden ${deptOpen ? "block" : "hidden"}`}>
                      <li>
                        <Link to="/departments" onClick={closeAll} className="block py-1 text-sm text-blue-700 font-semibold">
                          All Departments
                        </Link>
                      </li>
                      {(departments || []).map((dept) => (
                        <li key={dept.id}>
                          <Link
                            to={`/departments?id=${dept.id}`}
                            onClick={closeAll}
                            className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                          >
                            {dept.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={link}
                    onClick={closeAll}
                    className={`font-medium pb-1 border-b-2 transition-colors ${
                      active === link
                        ? "text-blue-600 border-blue-600"
                        : "text-blue-900 border-transparent hover:text-blue-600"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Book Appointment CTA */}
        <Link
          to="/book-appointment"
          onClick={closeAll}
          className="hidden sm:block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium text-sm whitespace-nowrap"
        >
          Book Appointment
        </Link>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(true)} className="lg:hidden ml-auto">
          <FaBars size={22} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
