import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Global Header */}
      <Header />

      <Outlet />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
export default AuthLayout;
