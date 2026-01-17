import React from "react";
import tailor1 from "../../assets/Tailors/tailor1.jpg";
import tailor2 from "../../assets/Tailors/tailor2.jpg";
import tailor3 from "../../assets/Tailors/tailor3.jpg";

const teamMembers = [
  {
    name: "Rohan Mehta",
    designation: "Head Tailor",
    phone: "+91 98765 43210",
    image: tailor3,
  },
  {
    name: "Sneha Kapoor",
    designation: "Ethnic Wear Specialist",
    phone: "+91 91234 56789",
    image: tailor2,
  },
  {
    name: "Aditya Sharma",
    designation: "Designer & Alterations",
    phone: "+91 99887 66554",
    image: tailor1,
  },
];

function TeamSection() {
  return (
    <section id="team" className="w-full py-16 px-4 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-neutral-400">
          Our skilled and dedicated team brings your fashion dreams to life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-zinc-800 rounded-2xl overflow-hidden shadow-lg flex flex-col items-center text-center p-4 hover:scale-105 transform transition duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-lime-400 mb-2">{member.designation}</p>
            <p className="text-neutral-400 text-sm">{member.phone}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
