import React, { useState, useEffect } from "react";
import image1 from "../../assets/Angdi.jpeg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";

const imageData = [
  {
    image: image1,
    title: "Custom Tailoring",
    description: "Precision custom stitching for perfect fit and comfort.",
    details: "We take detailed measurements and create garments that fit your body perfectly, ensuring comfort and style in every stitch."
  },
  {
    image: image2,
    title: "Ethnic Wear Collection",
    description: "Traditional outfits with contemporary designs.",
    details: "Our ethnic collection blends traditional craftsmanship with modern aesthetics, perfect for festivals, weddings, and special occasions."
  },
  {
    image: image3,
    title: "Designer Alterations",
    description: "Expert modifications to transform your outfits.",
    details: "We provide professional alteration services to give your existing wardrobe a fresh look and perfect fit."
  }
];

function AboutUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 2000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % imageData.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + imageData.length) % imageData.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const activeData = imageData[activeIndex];

  return (
    <section id="about" className="w-full px-4 sm:px-6 py-12 bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={activeData.image}
                  alt={activeData.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isAnimating ? "opacity-80" : "opacity-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-block">
                    <h3 className="text-lg font-bold text-white">{activeData.title}</h3>
                  </div>
                </div>

                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all disabled:opacity-50"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all disabled:opacity-50"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {imageData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    disabled={isAnimating}
                    className={`w-8 h-1 rounded-full transition-all ${
                      index === activeIndex 
                        ? "bg-lime-400" 
                        : "bg-neutral-600 hover:bg-neutral-500"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-lime-400/20 border border-lime-400/30 rounded-full text-lime-400 text-sm font-medium uppercase">
                  About Us
                </span>
              </div>

              <div className={`transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Crafted with Passion at{" "}
                  <span className="bg-gradient-to-r from-lime-300 to-lime-500 bg-clip-text text-transparent">
                    VedyaFashions
                  </span>
                </h2>

                <h3 className="text-2xl font-semibold text-lime-300 mb-3">
                  {activeData.title}
                </h3>

                <p className="text-lg text-white mb-4">{activeData.description}</p>
                <p className="text-neutral-300 leading-relaxed">{activeData.details}</p>
              </div>

              {/* Features */}
              <div className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-500 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-300">
                  <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Custom Fit</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-300">
                  <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Premium Fabrics</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-300">
                  <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Expert Tailors</span>
                </div>
              </div>

              <div className={`mt-8 pt-6 border-t border-neutral-700 transition-all duration-500 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}>
                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="group inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 font-medium disabled:opacity-50"
                >
                  Next: {imageData[(activeIndex + 1) % imageData.length].title}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
