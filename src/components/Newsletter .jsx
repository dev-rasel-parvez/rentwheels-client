import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
    return (
        <section className="bg-gradient-to-r from-sky-500 to-indigo-600 py-12 px-4 rounded-xl text-white relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Text */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Stay Updated!
                    </h2>
                    <p className="text-white/90">
                        Subscribe to our newsletter to get the latest updates, offers, and exclusive news delivered to your inbox.
                    </p>
                </div>

                {/* Subscription Form */}
                <form className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-1">
                        <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-black" />
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full py-3 pl-10 pr-4 rounded-lg border-2 border-white text-black placeholder-black bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
                            style={{ caretColor: 'black' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
