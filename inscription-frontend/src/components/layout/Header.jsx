import React from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Header = () => {
  return (
    <nav className="z-50 bg-white shadow-md py-4 px-6 md:px-12">

      <div className="flex items-center justify-between max-w-full mx-auto">
        <Logo />
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6 text-lg font-medium text-gray-700">
            <a
              href="#"
              className="hover:text-[#2A3B7C] border-b-2 border-transparent hover:border-[#2A3B7C] pb-1 transition duration-300"
            >
              Accueil
            </a>
            <a
              href="#"
              className="hover:text-[#2A3B7C] border-b-2 border-transparent hover:border-[#2A3B7C] pb-1 transition duration-300"
            >
              Nos Filières
            </a>
            <a
              href="#"
              className="hover:text-[#2A3B7C] border-b-2 border-transparent hover:border-[#2A3B7C] pb-1 transition duration-300"
            >
              Contact
            </a>
          </div>
          <div className="flex space-x-4">
            <Button primary>
              S'inscrire
            </Button>
            <Button outline>
              Se connecter
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;