import { FaQuoteLeft } from "react-icons/fa";
import { useRef, useEffect } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aisha R.",
      text: "Smooth booking and friendly provider. Highly recommend!",
      image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    },
    {
      name: "Carlos M.",
      text: "Great rates and reliable cars. Will use again.",
      image: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg",
    },
    {
      name: "Lina K.",
      text: "The booking process was simple and fast.",
      image: "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg",
    },
    {
      name: "David T.",
      text: "Excellent customer service and top quality cars.",
      image: "https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg",
    },
    {
      name: "Sophia L.",
      text: "Booking was fast and easy, very satisfied!",
      image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    },
    {
      name: "Maya R.",
      text: "Cars were clean and well-maintained, highly recommend.",
      image: "https://img.freepik.com/free-photo/vertical-shot-happy-dark-skinned-female-with-curly-hair_273609-15519.jpg",
    },
    {
      name: "Olivia F.",
      text: "Excellent experience overall, will use again.",
      image: "https://img.freepik.com/free-photo/confident-good-looking-girl-with-curly-hairstyle-look-camera-self-assured-sassy-smiling-pointing-upper-left-corner-introduce-amazing-product-give-recommendations_176420-37588.jpg",
    },
    {
      name: "Aisha R.",
      text: "Smooth booking and friendly provider. Highly recommend!",
      image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    },
    {
      name: "Carlos M.",
      text: "Great rates and reliable cars. Will use again.",
      image: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg",
    },
    {
      name: "Lina K.",
      text: "The booking process was simple and fast.",
      image: "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg",
    },
    {
      name: "David T.",
      text: "Excellent customer service and top quality cars.",
      image: "https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg",
    },
    {
      name: "Sophia L.",
      text: "Booking was fast and easy, very satisfied!",
      image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    },
    {
      name: "Maya R.",
      text: "Cars were clean and well-maintained, highly recommend.",
      image: "https://img.freepik.com/free-photo/vertical-shot-happy-dark-skinned-female-with-curly-hair_273609-15519.jpg",
    },
    {
      name: "Olivia F.",
      text: "Excellent experience overall, will use again.",
      image: "https://img.freepik.com/free-photo/confident-good-looking-girl-with-curly-hairstyle-look-camera-self-assured-sassy-smiling-pointing-upper-left-corner-introduce-amazing-product-give-recommendations_176420-37588.jpg",
    },{
      name: "Aisha R.",
      text: "Smooth booking and friendly provider. Highly recommend!",
      image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    },
    {
      name: "Carlos M.",
      text: "Great rates and reliable cars. Will use again.",
      image: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg",
    },
    {
      name: "Lina K.",
      text: "The booking process was simple and fast.",
      image: "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg",
    },
    {
      name: "David T.",
      text: "Excellent customer service and top quality cars.",
      image: "https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg",
    },
    {
      name: "Sophia L.",
      text: "Booking was fast and easy, very satisfied!",
      image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    },
    {
      name: "Maya R.",
      text: "Cars were clean and well-maintained, highly recommend.",
      image: "https://img.freepik.com/free-photo/vertical-shot-happy-dark-skinned-female-with-curly-hair_273609-15519.jpg",
    },
    {
      name: "Olivia F.",
      text: "Excellent experience overall, will use again.",
      image: "https://img.freepik.com/free-photo/confident-good-looking-girl-with-curly-hairstyle-look-camera-self-assured-sassy-smiling-pointing-upper-left-corner-introduce-amazing-product-give-recommendations_176420-37588.jpg",
    }
  ];

  const sliderRef = useRef(null);

  
  useEffect(() => {
    const slider = sliderRef.current;
    const scrollAmount = 320; 
    let scrollDirection = "right";

    const interval = setInterval(() => {
      if (!slider) return;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        scrollDirection = "left";
      } else if (slider.scrollLeft <= 0) {
        scrollDirection = "right";
      }

      slider.scrollBy({ left: scrollDirection === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-16 px-4 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Customer Testimonials
      </h2>

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

        {testimonials.map((t, index) => (
          <div
            key={index}
            className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 snap-center p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="font-semibold text-gray-800">{t.name}</div>
            </div>
            <p className="text-gray-600 text-sm relative pl-6">
              <FaQuoteLeft className="absolute left-0 top-0 text-gray-300" />
              {t.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
