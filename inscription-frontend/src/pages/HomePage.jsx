import React from 'react';
import Hero from '../components/sections/Hero';
import WaveSeparator from '../components/common/WaveSeparator';
import CoursesSection from '../components/sections/CoursesSection';
import WaveSeparatorInverted from '../components/common/WaveSeparatorInverted';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <WaveSeparator />
      <CoursesSection />
      <WaveSeparatorInverted />
      <ContactSection />
    </>
  );
};

export default HomePage;