import { useState, useEffect } from "react";
import { Link } from "react-router"; 
import useAxios from "../../hooks/useAxios";

const BrowseCars = () => {
  const axiosData = useAxios();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axiosData
      .get(`/cars/recent`)
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
      });
  }, [axiosData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cars.map((c) => (
        <Link to={`/cars/${c._id}`}
          key={c._id}
          className="border rounded-lg overflow-hidden shadow-sm cursor-pointer"
        >
          <img
            src={c.imageUrl || "/assets/car-placeholder.jpg"}
            alt={c.carName}
            className="w-full h-44 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{c.carName}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  c.status === "booked"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {c.status === "booked" ? "Booked" : "Available"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {c.category} • {c.location}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              <span className="font-bold">Car Provider:</span> {c.providerName}
            </p>

           
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-bold">Provider Email:</span>{" "}
              <a
                href={`mailto:${c.providerEmail}`}
                className="text-blue-600 hover:underline"
              >
                {c.providerEmail}
              </a>
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-lg font-bold">${c.rentPricePerDay}/day</div>
              <Link
                to={`/cars/${c._id}`}
                className="text-sm py-1 px-3 border rounded-md"
              >
                View Details
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrowseCars;
