import React from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <>
      {/* CSS for the underline-from-center effect */}
      <style>
        {`
        .underline-from-center {
          position: relative;
          display: inline-block;
          overflow: hidden; /* Ensures the underline doesn't show outside the link initially */
        }

        .underline-from-center::before {
          content: '';
          position: absolute;
          width: 0;
          height: 2px; /* Adjust thickness as needed */
          bottom: 0;
          left: 50%; /* Start from the center */
          background-color: #2A3B7C; /* Underline color */
          transition: width 0.3s ease-out, left 0.3s ease-out; /* 300ms delay for both width and position */
          transform: translateX(-50%); /* Adjust for perfect centering */
        }

        .underline-from-center:hover::before {
          width: 100%;
          left: 0; /* Stretch to the left edge */
          transform: translateX(0); /* Remove transform when fully stretched */
        }
        `}
      </style>
      <nav className="z-50 bg-white shadow-md py-[0.65rem] px-6 md:px-12">
        <div className="flex items-center justify-between max-w-full mx-auto">
          <Logo />
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6 text-lg font-medium text-[#000]">

              <Link
                to="/"
                className="underline-from-center hover:text-[#2A3B7C] pb-1 transition duration-800"
              >
                Accueil
              </Link>
              <Link
                to="/courses"
                className="underline-from-center hover:text-[#2A3B7C] pb-1 transition duration-800"
              >
                Nos Filières
              </Link>
              <Link
                to="/contact"
                className="underline-from-center hover:text-[#2A3B7C] pb-1 transition duration-800"
              >
                Contact
              </Link>
            </div>
            <div className="flex space-x-4">

              <Link to="/register">
                <Button primary>
                  S'inscrire
                </Button>
              </Link>
              <Link to="/login">
                <Button secondary>
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppHeader;