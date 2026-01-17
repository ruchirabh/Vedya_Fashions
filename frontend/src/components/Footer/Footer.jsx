import React from "react";

function Footer() {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // close mobile menu on click
  };

  return (
    <footer className="w-full bg-neutral-950 rounded-lg px-6 py-8 text-neutral-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Vedya Fashions
          </h2>
          <p className="text-sm mt-2 text-neutral-400">
            Handpicked ethnic & modern wear crafted with elegance.
          </p>

          <p className="text-sm mt-4">
            📞 <span className="text-neutral-200">+91 81975 14456</span>
          </p>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-medium text-neutral-200 mb-3">
            Store Address
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Vedya Fashions <br />
            2nd Floor, Sri Lakshmi Complex <br />
            Near Bus Stand Road <br />
            Thirthahalli – 577432 <br />
            Shivamogga District, Karnataka
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-medium text-neutral-200 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li onClick={() => handleScroll("home")} className="hover:text-lime-300 cursor-pointer">Home</li>
            <li onClick={() => handleScroll("about")} className="hover:text-lime-300 cursor-pointer">About Us</li>
            <li onClick={() => handleScroll("team")} className="hover:text-lime-300 cursor-pointer">Our Team</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 mt-16 pt-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Vedya Fashions. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
