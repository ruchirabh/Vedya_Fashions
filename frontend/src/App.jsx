import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col items-center p-3">
      {/* Navbar stays at top */}
      <Navbar />

      {/* Main content grows naturally */}
      <main className="w-full flex-1 flex justify-center items-start ">
        <LandingPage />
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default App;
