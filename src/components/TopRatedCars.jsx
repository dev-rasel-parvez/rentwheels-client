import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useEffect } from "react";

const TopRatedCars = () => {
  const cars = [
    {
      name: "Buick Sedan",
      description: "Smooth ride, luxurious interior, and reliable performance.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_1280.jpg",
    },
    {
      name: "Lamborghini Huracán",
      description: "Iconic design and unmatched supercar performance.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2023/07/19/12/16/car-8136751_1280.jpg",
    },
    {
      name: "Opel Astra",
      description: "Compact hatchback with smart features and great mileage.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2020/05/19/10/05/opel-5190050_1280.jpg",
    },
    {
      name: "Mercedes-Benz",
      description: "Luxury sedan with top-class comfort and safety.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2016/11/21/18/07/automotive-1846910_1280.jpg",
    },
    {
      name: "BMW Convertible",
      description: "Sporty, stylish, and engineered for thrilling drives.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg",
    },
    {
      name: "Tesla Model Y",
      description: "All-electric innovation with cutting-edge technology.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2024/01/07/14/12/man-8493246_1280.jpg",
    },
    {
      name: "Buick Sedan",
      description: "Smooth ride, luxurious interior, and reliable performance.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_1280.jpg",
    },
    {
      name: "Lamborghini Huracán",
      description: "Iconic design and unmatched supercar performance.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2023/07/19/12/16/car-8136751_1280.jpg",
    },
    {
      name: "Opel Astra",
      description: "Compact hatchback with smart features and great mileage.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2020/05/19/10/05/opel-5190050_1280.jpg",
    },
    {
      name: "Mercedes-Benz",
      description: "Luxury sedan with top-class comfort and safety.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2016/11/21/18/07/automotive-1846910_1280.jpg",
    },
    {
      name: "BMW Convertible",
      description: "Sporty, stylish, and engineered for thrilling drives.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg",
    },
    {
      name: "Tesla Model Y",
      description: "All-electric innovation with cutting-edge technology.",
      rating: 5,
      image:
        "https://cdn.pixabay.com/photo/2024/01/07/14/12/man-8493246_1280.jpg",
    }
  ];

  const sliderRef = useRef(null);

  
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 350;

    if (direction === "left") {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  
  useEffect(() => {
    const slider = sliderRef.current;
    const scrollAmount = 350;
    let scrollDirection = "right";

    const interval = setInterval(() => {
      if (!slider) return;

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 5
      ) {
        
        scrollDirection = "left";
      } else if (slider.scrollLeft <= 0) {
        
        scrollDirection = "right";
      }

      if (scrollDirection === "right") {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-16 px-4 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Top Rated Cars
      </h2>

      
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white transition"
      >
        <FaChevronLeft className="text-gray-700 text-lg" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white transition"
      >
        <FaChevronRight className="text-gray-700 text-lg" />
      </button>

     
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {cars.map((car, index) => (
          <div
            key={index}
            className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 snap-center"
          >
            <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white font-semibold text-lg">
                {car.name}
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600">{car.description}</p>
              <div className="flex items-center mt-3 text-yellow-500">
                {[...Array(5)].map((_, i) =>
                  i < car.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedCars;
