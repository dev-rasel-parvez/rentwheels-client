import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";


export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              RW
            </div>
            <div>
              <div className="font-bold text-lg">RentWheels</div>
              <div className="text-xs text-gray-500">Local car rentals</div>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <NavLink to="/" className="text-sm">Home</NavLink>
            <NavLink to="/browse" className="text-sm">Browse Cars</NavLink>
            <NavLink to="/add-car" className="text-sm">Add Car</NavLink>
            <NavLink to="/my-listings" className="text-sm">My Listings</NavLink>
            <NavLink to="/my-bookings" className="text-sm">My Bookings</NavLink>

            {!user ? (
              <Link to="/login" className="ml-4 px-3 py-1 border rounded-md text-sm">Login</Link>
            ) : (
              <div className="relative ml-4">
                <button
                  className="w-9 h-9 rounded-full overflow-hidden border"
                  onClick={() => setOpen((s) => !s)}
                  title={user.displayName || user.email}
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}`}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border rounded-md p-3 shadow-lg z-20">
                    <div className="text-sm font-medium">{user.displayName || "No name"}</div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                    <hr className="my-2" />
                    <Link to="/profile" className="block text-sm py-1">Profile</Link>
                    <button className="block text-left w-full text-sm py-1" onClick={() => { logout(); setOpen(false); }}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-50 dark:bg-slate-900 border-t">
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">RW</div>
              <div>
                <div className="font-bold">RentWheels</div>
                <div className="text-xs text-gray-500">Book local cars with confidence</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Contact: support@rentwheels.example</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-600">
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/browse">Browse Cars</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Social</h4>
            <div className="flex gap-2">
              <a href="#" aria-label="facebook" className="text-sm">Facebook</a>
              <a href="#" aria-label="instagram" className="text-sm">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 py-3">© {new Date().getFullYear()} RentWheels</div>
      </footer>
    </div>
  );
}
