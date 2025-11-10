import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddCar = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    category: "",
    rentPricePerDay: "",
    location: "",
    imageUrl: "",
  });

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      ...formData,
      rentPricePerDay: parseFloat(formData.rentPricePerDay),
      providerName: user?.displayName || "Unknown",
      providerEmail: user?.email,
      status: "available",
      addedDate: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/cars", newCar);
      let timerInterval;
      Swal.fire({
        title: "🚗 Car Added Successfully!",
        icon: "success",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#ffffff",
        customClass: {
          popup: "rounded-lg shadow-lg border border-gray-200",
          title: "text-green-700 font-semibold",
        },
        didOpen: () => {
          Swal.showLoading();
          const timerEl = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timerEl.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/browse-cars");
        }
      });


      
    } catch (error) {
      console.error("Failed to add car:", error);
      toast.error("Failed to add car. Please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center mt-1 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg border border-gray-100 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add a New Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Car Name
            </label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              required
              placeholder="Enter car name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Enter car description"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Rent Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rent Price (per day)
            </label>
            <input
              type="number"
              name="rentPricePerDay"
              value={formData.rentPricePerDay}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter daily rent price"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter car location"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Car Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/car-image.jpg"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition duration-200"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
