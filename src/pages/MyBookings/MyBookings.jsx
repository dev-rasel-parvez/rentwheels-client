import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Cancel booking
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

  if (bookings.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">
        You have no active bookings.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Bookings
      </h1>

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
                  className={`${
                    booking.status === "booked"
                      ? "text-red-600"
                      : "text-green-600"
                  } font-semibold`}
                >
                  {booking.status || 'Booked'}
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
    </div>
  );
};

export default MyBookings;
