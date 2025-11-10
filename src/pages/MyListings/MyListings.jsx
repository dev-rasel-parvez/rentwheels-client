import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyListings = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (user?.email) {
      AxiosSecure.get(`/my-cars?email=${user.email}`)
        .then((res) => {
          setMyCars(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch my listings:", err);
          setLoading(false);
        });
    }
  }, [AxiosSecure, user?.email]);


  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosSecure.delete(`/cars/${id}`);
          setMyCars((prev) => prev.filter((car) => car._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your car listing has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Delete failed:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete car. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };


  const handleEdit = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  //handleUpdateSubmit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedCar = {
      carName: form.carName.value,
      category: form.category.value,
      rentPricePerDay: parseFloat(form.rentPricePerDay.value),
      location: form.location.value,
      imageUrl: form.imageUrl.value,
      description: form.description.value,
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#6b7280",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosSecure.patch(`/cars/${selectedCar._id}`, updatedCar);

          // Update state
          setMyCars((prev) =>
            prev.map((car) =>
              car._id === selectedCar._id ? { ...car, ...updatedCar } : car
            )
          );

          setShowModal(false);
          setSelectedCar(null);

          Swal.fire({
            title: "Saved!",
            text: "Your car details have been updated successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Update failed:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to update car. Please try again.",
            icon: "error",
          });
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Changes are not saved",
          text: "Your previous car details remain unchanged.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
        setShowModal(false);
        setSelectedCar(null);
      } else if (result.isDismissed) {
        setShowModal(false);
        setSelectedCar(null);
      }
    });
  };



  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your listings...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Listings
      </h1>

      {myCars.length === 0 ? (
        <p className="text-center text-gray-500">You have no listed cars.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Car Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-center">Rent/Day</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => (
                <tr
                  key={car._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">{car.carName}</td>
                  <td className="py-3 px-4">{car.category}</td>
                  <td className="py-3 px-4 text-center text-indigo-600 font-medium">
                    ${car.rentPricePerDay}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${car.status === "booked"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-blue-600 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Update Car Details
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                name="carName"
                defaultValue={selectedCar.carName}
                placeholder="Car Name"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={selectedCar.category}
                placeholder="Category"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="number"
                name="rentPricePerDay"
                defaultValue={selectedCar.rentPricePerDay}
                placeholder="Rent Price Per Day"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="location"
                defaultValue={selectedCar.location}
                placeholder="Location"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="imageUrl"
                defaultValue={selectedCar.imageUrl}
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded-md"
              />
              <textarea
                name="description"
                defaultValue={selectedCar.description}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded-md"
              ></textarea>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
