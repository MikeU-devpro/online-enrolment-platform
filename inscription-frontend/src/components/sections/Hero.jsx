import React from 'react';
import Button from '../common/Button';

import hangingTags from '/assets/svg/hanging-tags.svg';

const Hero = () => {
  return (
    <section
      className="relative h-[70vh] md:h-[70vh] bg-cover bg-center flex flex-col justify-start text-white pt-16 md:pt-20 overflow-visible"
      style={{ backgroundImage: "url('/assets/images/hero-bg.png')" }}
    >

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-40 text-left max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto md:ml-24 px-12 md:px-24">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
          Ignite Academy : Quand la curiosité allume le succès
        </h1>
        <div className="flex justify-end space-x-4">
          <Button primary size="lg">S'inscrire</Button>
          <Button outline size="lg">Se connecter</Button>
        </div>
      </div>

      <img
        src={hangingTags}
        alt="Decorative Hanging Tags"
        className="absolute bottom-[-11rem] right-12 md:right-24 w-40 md:w-48 lg:w-56 z-40"
      />

    </section>
  );
};

export default Hero;