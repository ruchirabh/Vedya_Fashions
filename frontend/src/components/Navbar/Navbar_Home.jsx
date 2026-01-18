import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // install: npm i lucide-react
import { useNavigate } from "react-router-dom";

function Navbar_Home() {
  const navigate = useNavigate();
  const logout = () => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
};


  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // close mobile menu on click
  };

  const NavLinks = () => (
    <>
      <button
        onClick={() => handleScroll("home")}
        className="text-yellow-50 hover-gradient-text"
      >
        Home
      </button>
      <button
        onClick={() => handleScroll("about")}
        className="text-yellow-50 hover-gradient-text"
      >
        New Customer
      </button>
      <button
        onClick={() => handleScroll("team")}
        className="text-yellow-50 hover-gradient-text"
      >
        New Order
      </button>
      <button
        onClick={() => logout()}
        className="text-yellow-50 hover-gradient-text"
      >
        Logout
      </button>
    </>
  );

  return (
    <>
      {/* Navbar_Home */}
      <div className="w-2/3 max-md:w-full h-12 bg-neutral-950 rounded-lg px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold gradient-text">VedyaFashions</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 pe-5">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
          <div className="w-64 h-full bg-neutral-950 p-6 flex flex-col gap-6">
            {/* Close Button */}
            <button
              className="self-end text-yellow-50"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Menu Items */}
            <NavLinks />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar_Home;
