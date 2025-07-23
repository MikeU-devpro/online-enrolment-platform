import React from 'react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import WaveSeparator from '../common/WaveSeparator';

const Hero = () => {
  return (
    <section
      className="
        relative
        h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh]
        bg-cover bg-center flex flex-col justify-start text-white
        pt-12 sm:pt-16 md:pt-20 lg:pt-24
        overflow-hidden /* Keep this for wave management */
      "
      style={{ backgroundImage: "url('/assets/images/hero-bg.png')" }}
    >
 

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="
        relative z-40
        w-full md:w-[752px] xl:w-[752px]
        h-auto md:h-[282px] xl:h-[282px]
        mx-auto
        px-6 sm:px-12 md:px-0
        md:ml-24 lg:ml-32 xl:ml-48
        text-center md:text-left
      ">
        <h1 className="
          font-roboto font-bold
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px]
          leading-[100%]
          tracking-[-0.41px]
          mb-8
        ">
           Ignite Academy<br/>
           Quand la curiosité<br/>
           allume le succès
        </h1>
        <div className="flex justify-center space-x-4 mt-6">
          <Link to="/register">
            <Button primary size="lg" className="w-[213.72px] h-[55.9px]">S'inscrire</Button>
          </Link>
          <Link to="/login">
            <Button secondary size="lg" className="w-[213.72px] h-[55.9px]">Se connecter</Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[10rem] sm:h-[5rem] md:h-[5rem] lg:h-[5rem] xl:h-[5rem] z-10">
        <WaveSeparator />
      </div>

    </section>
  );
};

export default Hero;