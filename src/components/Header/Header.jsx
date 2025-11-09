import { Link, NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaCarSide, FaMoon, FaSun } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  // ✅ Theme state synced with localStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-cars"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Browse Cars
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-car"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "hover:text-primary"
              }
            >
              Add Car
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-listings"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "hover:text-primary"
              }
            >
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "hover:text-primary"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="shadow-md bg-base-100 sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left section */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <FaCarSide className="text-primary" />
            <span className="text-primary">RentWheels</span>
          </Link>
        </div>

        {/* Middle (desktop) */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">{navLinks}</ul>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link to="/auth/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/rdZC9p1/user.png"}
                    alt="User avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56"
              >
                {/* User info */}
                <li className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{user?.displayName}</span>
                  <span>{user?.email}</span>
                </li>

                {/* ✅ Theme toggle (now fully functional) */}
                <li className="flex items-center justify-between py-1">
                  <span className="text-sm">
                    {theme === "light" ? "Light Mode" : "Dark Mode"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle text-lg"
                    title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                  >
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                  </button>
                </li>

                <div className="divider my-2"></div>

                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <MdLogout /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile dropdown */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
