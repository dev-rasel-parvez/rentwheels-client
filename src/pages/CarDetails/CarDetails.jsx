import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const AxiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        AxiosSecure
            .get(`/cars/${id}`)
            .then((res) => {
                setCar(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch car:", err);
                setLoading(false);
            });
    }, [AxiosSecure, id]);

    // ✅ Handle booking
    const handleBooking = async () => {
        if (!user) {
            toast.error("Please log in to book a car!");
            navigate("/login");
            return;
        }

        try {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, "0");
            const dd = String(today.getDate()).padStart(2, "0");
            const addedDate = `${yyyy}-${mm}-${dd}`;

            const bookingData = {
                carId: car._id,
                carName: car.carName,
                category: car.category,
                location: car.location,
                imageUrl: car.imageUrl,
                providerName: car.providerName,
                providerEmail: car.providerEmail,
                rentPricePerDay: car.rentPricePerDay,
                userEmail: user.email,
                userName: user.displayName,
                bookingDate: addedDate,
            };

            await AxiosSecure.post("/bookings", bookingData);

            toast.success("Car booked successfully!");
            setCar((prev) => ({ ...prev, status: "booked" }));
        } catch (err) {
            console.error("Booking failed:", err);
            toast.error("Booking failed. Try again later.");
        }
    };


    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                Loading car details...
            </div>
        );

    if (!car)
        return <div className="text-center py-10 text-gray-600">Car not found.</div>;

    return (
        <div className="flex justify-center mt-1 px-4">
            <div className="max-w-[480px] w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={car.imageUrl || "/assets/car-placeholder.jpg"}
                        alt={car.carName}
                        className="w-full h-52 object-cover"
                    />
                    <span
                        className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${car.status === "booked"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                            }`}
                    >
                        {car.status === "booked" ? "Unavailable" : "Available"}
                    </span>
                </div>

                {/* DETAILS */}
                <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {car.carName}
                        </h1>
                        <p className="text-indigo-600 font-bold text-lg">
                            ${car.rentPricePerDay}/day
                        </p>
                    </div>

                    <p className="text-sm text-gray-500">{car.category} • {car.location}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>

                    {/* Provider Info */}
                    <div className="mt-3 bg-gray-50 rounded-md p-3 border">
                        <h3 className="font-medium text-gray-800 text-sm mb-1">
                            Car Provider
                        </h3>
                        <p className="text-sm">
                            <span className="font-semibold">Name:</span> {car.providerName}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Email:</span>{" "}
                            <a
                                href={`mailto:${car.providerEmail}`}
                                className="text-blue-600 hover:underline"
                            >
                                {car.providerEmail}
                            </a>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={handleBooking}
                            disabled={car.status === "booked"}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${car.status === "booked"
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                        >
                            {car.status === "booked" ? "Already Booked" : "Book Now"}
                        </button>

                        <Link
                            to="/browse-cars"
                            className="px-5 py-2 border text-sm font-medium rounded-lg hover:bg-gray-100"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
