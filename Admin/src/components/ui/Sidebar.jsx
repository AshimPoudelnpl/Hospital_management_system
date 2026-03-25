import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../Redux/features/authState";
import logo from "../../assets/logo.png";

const navItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 24 24"
      >
        <path d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z" />
        <path d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z" />
      </svg>
    ),
  },
  {
    label: "Doctors",
    to: "/admin/doctors",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 512 512"
      >
        <path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754z" />
      </svg>
    ),
  },
  {
    label: "Departments",
    to: "/admin/departments",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 24 24"
      >
        <path d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z" />
        <path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" />
        <path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    label: "Services",
    to: "/admin/services",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 510 510"
      >
        <g fillOpacity=".9">
          <path d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z" />
          <path d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z" />
        </g>
      </svg>
    ),
  },
  {
    label: "Appointments",
    to: "/admin/appointments",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 25 25"
      >
        <path d="M21.5 1.25h-18A2.25 2.25 0 0 0 1.25 3.5v18a2.25 2.25 0 0 0 2.25 2.25h18a2.25 2.25 0 0 0 2.25-2.25v-18a2.25 2.25 0 0 0-2.25-2.25zm.75 20.25a.75.75 0 0 1-.75.75h-18a.75.75 0 0 1-.75-.75v-18a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 .75.75z" />
        <path d="M11.75 7.25h1.5v10.5h-1.5z" />
        <path d="M7.25 11.75h10.5v1.5H7.25z" />
      </svg>
    ),
  },
  {
    label: "Notices",
    to: "/admin/notices",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 371.263 371.263"
      >
        <path d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731z" />
      </svg>
    ),
  },
  {
    label: "Contacts",
    to: "/admin/contacts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 214.27 214.27"
      >
        <path d="M196.926 55.171c-.11-5.785-.215-11.25-.215-16.537a7.5 7.5 0 0 0-7.5-7.5c-32.075 0-56.496-9.218-76.852-29.01a7.498 7.498 0 0 0-10.457 0c-20.354 19.792-44.771 29.01-76.844 29.01a7.5 7.5 0 0 0-7.5 7.5c0 5.288-.104 10.755-.215 16.541-1.028 53.836-2.436 127.567 87.331 158.682a7.495 7.495 0 0 0 4.912 0c89.774-31.116 88.368-104.849 87.34-158.686z" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    to: "/admin/reviews",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
    ),
  },
  {
    label: "Profile",
    to: "/admin/profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-[18px] h-[18px] mr-3"
        viewBox="0 0 512 512"
      >
        <path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754z" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    // Clear localStorage backup
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden ml-4 mt-4 fixed top-0 left-0 bg-white z-[50] p-1 rounded shadow"
      >
        <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <nav className="lg:min-w-[250px] w-max max-lg:min-w-8">
        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-[98] lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`bg-white shadow-lg h-screen fixed top-0 left-0 flex flex-col z-[99] lg:min-w-[250px] w-[250px] transition-all duration-500 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex items-center gap-2 pt-6 pb-2 px-4 sticky top-0 bg-white min-h-[64px] z-[100] border-b border-gray-100">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-slate-800 text-sm">
              Swastik Hospital
            </span>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden ml-auto"
            >
              <svg className="w-6 h-6" fill="#000" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="py-4 px-4 flex-1 overflow-auto">
            <ul className="space-y-1">
              {navItems.map(({ label, to, icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-slate-800 text-[15px] font-medium flex items-center cursor-pointer rounded-md px-3 py-2.5 transition-all duration-300 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`
                    }
                  >
                    {icon}
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full text-slate-800 text-[15px] font-medium flex items-center cursor-pointer hover:bg-red-50 hover:text-red-500 rounded-md px-3 py-2.5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-3"
                viewBox="0 0 6 6"
              >
                <path d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
