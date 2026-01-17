import React from "react";

function HomeSection() {
  return (
    <section id="home"  className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-300 rounded-full filter blur-3xl animate-pulse opacity-20 sm:opacity-10"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl animate-pulse opacity-20 sm:opacity-10"
          style={{ animationDelay: "5s" }}
        ></div>
      </div>

      {/* Main content */}
      <p className="uppercase tracking-widest text-sm gradient-text mb-4 z-10">
        Tailored to Perfection
      </p>

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6 z-10">
        Welcome to <span className="gradient-text">VedyaFashions</span>
      </h1>

      <p className="max-w-xl sm:max-w-2xl text-neutral-400 text-sm sm:text-base md:text-lg mb-10 z-10">
        Where craftsmanship meets elegance. We specialize in custom tailoring,
        premium ethnic wear, modern fits, and timeless designs crafted
        exclusively for you.
      </p>

      <div className="flex gap-4 flex-wrap justify-center z-10">
        <button className="px-6 py-3 rounded-full bg-lime-500 text-neutral-900 font-semibold hover:bg-lime-400 transition">
          Explore Our Work
        </button>

        <button className="px-6 py-3 rounded-full border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-neutral-900 transition">
          Contact Tailor
        </button>
      </div>
    </section>
  );
}

export default HomeSection;
