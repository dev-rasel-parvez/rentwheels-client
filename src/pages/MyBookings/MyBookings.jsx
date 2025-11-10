import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBookingsAlertShown, setNoBookingsAlertShown] = useState(false);

  // Fetch user bookings
  useEffect(() => {
    if (user?.email) {
      AxiosSecure.get(`/my-bookings?email=${user.email}`)
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load bookings:", err);
          setLoading(false);
        });
    }
  }, [AxiosSecure, user?.email]);

  // Show SweetAlert2 if no bookings
  useEffect(() => {
    if (!loading && bookings.length === 0 && !noBookingsAlertShown) {
      Swal.fire({
        title: "You have no active bookings.",
        text: "Please go to browse cars.",
        
        confirmButtonText: "Browse Cars",
        timer: 25000, // 25 seconds
        timerProgressBar: true,
        showCancelButton: false,
        allowOutsideClick: true,
        allowEscapeKey: false,
        customClass: {
          timerProgressBar: 'swal2-progress-bar-green'
        }
      }).then((result) => {
        // Redirect when button clicked or timer ends
        navigate("/browse-cars");
      });

      setNoBookingsAlertShown(true);
    }
  }, [loading, bookings, noBookingsAlertShown, navigate]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await AxiosSecure.delete(`/bookings/${id}`);
      toast.success("Booking cancelled successfully!");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Cancel booking failed:", err);
      toast.error("Failed to cancel booking!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your bookings...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? null : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <img
                src={booking.imageUrl || "/assets/car-placeholder.jpg"}
                alt={booking.carName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking.carName}
                </h2>
                <p className="text-sm text-gray-500">
                  {booking.category} • {booking.location}
                </p>

                <p className="text-indigo-600 font-semibold text-sm">
                  ${booking.rentPricePerDay}/day
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Provide By:</span>{" "}
                  {booking.providerName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {booking.providerEmail}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Booking Date:</span>{" "}
                  {booking.bookingDate}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`${booking.status === "booked"
                        ? "text-red-600"
                        : "text-green-600"
                      } font-semibold`}
                  >
                    {booking.status || "Booked"}
                  </span>
                </p>

                <p className="text-sm">
                  <span className="font-medium">Booked By:</span>{" "}
                  {booking.userName}
                </p>

                <button
                  onClick={() => handleCancel(booking._id)}
                  className="w-full mt-3 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-all"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
