import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Footer = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">RentWheels</h2>
          <p className="text-sm text-gray-600">
            RentWheels connects users with trusted car owners and rental providers.
            Book your next ride easily and securely.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/browse-cars" className="hover:text-primary">Browse Cars</Link></li>
            {!user ? (
              <>
                <li><Link to="/auth/login" className="hover:text-primary">Login</Link></li>
                <li><Link to="/auth/signup" className="hover:text-primary">Signup</Link></li>
              </>
            ) : null}

          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Contact</h3>
          <p className="text-sm text-gray-600">Email: support@rentwheels.com</p>
          <p className="text-sm text-gray-600 mb-3">Phone: +1 234 567 890</p>
          <div className="flex gap-4">
            <a href="#" className="text-primary hover:scale-110 transition">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="text-primary hover:scale-110 transition">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="text-primary hover:scale-110 transition">
              <FaTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} RentWheels. All rights reserved. |
        <Link to="#" className="text-primary ml-1">Terms & Conditions</Link>
      </div>
    </footer>
  );
};

export default Footer;
