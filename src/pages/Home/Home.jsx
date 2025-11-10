import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../components/Loader";
import Slider from "react-slick";
import { FaTags, FaShieldAlt, FaHeadset, FaRegCalendarCheck } from "react-icons/fa";
import TopRatedCars from "../../components/TopRatedCars";
import Testimonials from "../../components/Testimonials ";
import Newsletter from "../../components/Newsletter ";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/cars`);
        const data = await res.json();
        setCars(data || []);
        console.log(data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const featured = cars.slice(0, 6);

  return (
    <div>

      {/* HERO */}
      <section className="mb-10">
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-500 text-white shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-14">

            {/* LEFT TEXT SIDE (40%) */}
            <div className="w-full md:w-2/5 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
                Find the Perfect Ride
                <br className="hidden md:block" /> for Your Next Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-md mx-auto md:mx-0">
                RentWheels connects you with trusted local car owners — fast, easy, and reliable rentals at your fingertips.
              </p>
              <div>
                <Link
                  to="/browse-cars"
                  className="inline-block bg-white text-sky-600 hover:bg-sky-100 px-6 py-3 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300"
                >
                  Browse Cars
                </Link>
              </div>
            </div>

            {/* RIGHT SLIDER SIDE (60%) */}
            <div className="w-full md:w-3/5 mt-10 md:mt-0">
              {/* Keeps consistent ratio and good height on all devices */}
              <div className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                <Slider
                  dots={true}
                  infinite={true}
                  speed={600}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000} // slightly slower for readability
                  arrows={false}
                  pauseOnHover={true}
                  className="rounded-lg"
                >
                  {/* Slide 1 */}
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg"
                      alt="Wide range of cars"
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Strong gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center text-center">
                      <div className="px-6">
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white drop-shadow-lg">
                          Wide Range of Cars
                        </h3>
                        <p className="text-sm sm:text-base text-gray-100 drop-shadow-md max-w-md mx-auto">
                          From economy to luxury, SUVs to EVs — choose your perfect match.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.pexels.com/photos/29054407/pexels-photo-29054407.jpeg"
                      alt="Easy online booking"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center text-center">
                      <div className="px-6">
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white drop-shadow-lg">
                          Book Instantly Online
                        </h3>
                        <p className="text-sm sm:text-base text-gray-100 drop-shadow-md max-w-md mx-auto">
                          Rent your car anytime, anywhere — hassle-free and secure.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1670332362033-28204ec1ca92?auto=format&fit=crop&q=80&w=1200"
                      alt="Trusted providers"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center text-center">
                      <div className="px-6">
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white drop-shadow-lg">
                          Trusted Local Providers
                        </h3>
                        <p className="text-sm sm:text-base text-gray-100 drop-shadow-md max-w-md mx-auto">
                          Verified hosts and transparent pricing for peace of mind.
                        </p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="mb-12">
        <div className="relative mb-4 text-center">
          <h2 className="text-3xl font-semibold">Our Featured Cars</h2>
        </div>


        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.length === 0 && <div className="text-gray-500">No cars available yet.</div>}
            {featured.map((c) => (
              <Link to={`/cars/${c._id}`} key={c._id} className="border rounded-lg overflow-hidden shadow-sm cursor-pointer">
                <img src={c.imageUrl || "/assets/car-placeholder.jpg"} alt={c.name} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{c.carName}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${c.status === "booked" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {c.status === "booked" ? "Booked" : "Available"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{c.category} • {c.location}</p>
                  <p className="text-sm text-gray-600 mt-1"> <span className="font-bold">Car Provider:</span> {c.providerName}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold">${c.rentPricePerDay}/day</div>
                    <Link to={`/cars/${c._id}`} className="text-sm py-1 px-3 border rounded-md">View Details</Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="relative my-4 text-center">
          <Link to="/browse-cars" className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-sky-600">
            See all
          </Link>
        </div>

      </section>

      {/* WHY RENT WITH US */}
      <section className="mb-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Rent With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <FaRegCalendarCheck></FaRegCalendarCheck>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Easy Booking</h4>
              <p className="text-sm text-gray-600">
                Quick search, transparent pricing, and instant booking confirmations.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaTags></FaTags>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Affordable Rates</h4>
              <p className="text-sm text-gray-600">
                Competitive daily pricing from trusted local providers.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <FaShieldAlt></FaShieldAlt>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Trusted Providers</h4>
              <p className="text-sm text-gray-600">
                Verified profiles and booking history for confident choices.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <FaHeadset></FaHeadset>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">24/7 Support</h4>
              <p className="text-sm text-gray-600">
                Our friendly team is ready to help whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* EXTRA: Top Rated */}
      <TopRatedCars></TopRatedCars>

      {/* EXTRA: Testimonials */}

      <Testimonials></Testimonials>

      {/* EXTRA: Newsletter */}
      <Newsletter></Newsletter>

    </div>
  );
}
