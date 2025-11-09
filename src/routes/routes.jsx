import { createBrowserRouter } from "react-router";

// ============ Layouts ============
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// ============ Pages ============
import Home from "../pages/Home/Home";
import BrowseCars from "../pages/BrowseCars/BrowseCars";
import AddCar from "../pages/AddCar/AddCar";
import MyListings from "../pages/MyListings/MyListings";
import MyBookings from "../pages/MyBookings/MyBookings";
import CarDetails from "../pages/CarDetails/CarDetails";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import NotFound from "../pages/NotFound";
import Loading from "../components/Loader";

// ============ Private Route Wrapper ============
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
  // ---------------- MAIN ROUTES ----------------
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "browse-cars",
        element: <BrowseCars />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "car/:id",
        element: (
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },

  // ---------------- AUTH ROUTES ----------------
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },

  // ---------------- 404 PAGE ----------------
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
