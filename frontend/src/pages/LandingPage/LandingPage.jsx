import React from 'react';
import HomeSection from '../../components/Sections/HomeSection';
import AboutUsSection from '../../components/Sections/AboutUsSection';
import TeamSection from '../../components/Sections/TeamSection';

function LandingPage() {
  return (
    <div className="w-full flex flex-col">
      <HomeSection />
      <AboutUsSection />
      <TeamSection/>
    </div>
  );
}

export default LandingPage;
