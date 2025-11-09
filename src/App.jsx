import React, { Suspense } from "react";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import router from "./routes/routes";

import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import Loader from "./components/Loader";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          {/* RouterProvider provides the routing context */}
          <RouterProvider router={router} />

          {/* Toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}
