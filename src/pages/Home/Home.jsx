import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../components/Loader";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import { FaTags, FaShieldAlt, FaHeadset, FaRegCalendarCheck } from "react-icons/fa";
import TopRatedCars from "../../components/TopRatedCars";
import Testimonials from "../../components/Testimonials ";
import Newsletter from "../../components/Newsletter ";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/cars/recent`);
        const data = await res.json();
        setCars(data || []);
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim() === "") {
        setFilteredCars([]);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/cars/search?query=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();
        setFilteredCars(data);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const featured = cars.slice(0, 6);

 
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div>
      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-500 text-white shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-14">
            <motion.div
              variants={fadeUp}
              className="w-full md:w-2/5 text-center md:text-left space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
                <span className="block">Find the Perfect Ride</span>
                <span className="text-yellow-300">
                  <Typewriter
                    words={[
                      "for Your Next Journey",
                      "for Your Dream Trip",
                      "for Your Business Travel",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
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
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="w-full md:w-3/5 mt-10 md:mt-0"
            >
              <div className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                <Slider
                  dots={true}
                  infinite={true}
                  speed={600}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000}
                  arrows={false}
                  pauseOnHover={true}
                  className="rounded-lg"
                >
                  
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg"
                      alt="Wide range of cars"
                      className="w-full h-full object-cover object-center"
                    />
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FEATURED CARS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="relative mb-4 text-center">
          <h2 className="text-3xl font-semibold">Our Featured Cars</h2>
        </div>

        <div className="flex flex-col items-center justify-center mb-8 px-4">
          <input
            type="text"
            placeholder="Search cars by name..."
            className="w-full max-w-sm px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 text-center transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {searchTerm.trim() !== "" && filteredCars.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-2xl font-semibold bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-md">
                  🚗 No cars found according to your search
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredCars.length > 0 ? filteredCars : featured).map((c, i) => (
                  <motion.div
                    key={c._id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="will-change-transform overflow-hidden"
                  >

                    <Link
                      to={`/cars/${c._id}`}
                      className="border rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md duration-200"
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
                            className={`text-xs px-2 py-1 rounded ${c.status === "booked"
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
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {searchTerm.trim() === "" && (
          <div className="relative my-4 text-center">
            <Link
              to="/browse-cars"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-sky-600"
            >
              See all
            </Link>
          </div>
        )}
      </motion.section>

      {/* WHY RENT WITH US */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="mb-16 px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Rent With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaRegCalendarCheck />,
              title: "Easy Booking",
              text: "Quick search, transparent pricing, and instant booking confirmations.",
              color: "sky",
            },
            {
              icon: <FaTags />,
              title: "Affordable Rates",
              text: "Competitive daily pricing from trusted local providers.",
              color: "emerald",
            },
            {
              icon: <FaShieldAlt />,
              title: "Trusted Providers",
              text: "Verified profiles and booking history for confident choices.",
              color: "yellow",
            },
            {
              icon: <FaHeadset />,
              title: "24/7 Support",
              text: "Our friendly team is ready to help whenever you need us.",
              color: "rose",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-${card.color}-100 text-${card.color}-600`}
                >
                  {card.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-600">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* EXTRA: Top Rated */}
      <TopRatedCars />

      {/* EXTRA: Testimonials */}
      <Testimonials />

      {/* EXTRA: Newsletter */}
      <Newsletter />
    </div>
  );
}
