import React from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { Link } from 'react-router-dom'; // <--- Import Link

const Header = () => {
  return (
    <nav className="z-50 bg-white shadow-md py-4 px-6 md:px-12">
      <div className="flex items-center justify-between max-w-full mx-auto">
        <Logo />
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6 text-lg font-medium text-gray-700">
            {/* Update standard anchor tags to Link components */}
            <Link
              to="/" // Link to the HomePage route
              className="hover:text-[#2A3B7C] border-b-2 border-transparent hover:border-[#2A3B7C] pb-1 transition duration-300"
            >
              Accueil
            </Link>
            <Link
              to="/courses" // Link to the CoursesSection (or a dedicated Courses page)
              className="hover:text-[#2A3B7C] border-b-2 border-transparent hover:border-[#2A3B7C] pb-1 transition duration-300"
            >
              Nos Filières
            </Link>
            <Link
              to="/contact" // Link to the ContactSection (or a dedicated Contact page)
              className="hover:text-[#2A3B7C] border-b-2 border-transparent hover:border-[#2A3B7C] pb-1 transition duration-300"
            >
              Contact
            </Link>
          </div>
          <div className="flex space-x-4">
            {/* Update Button components to be wrapped by Link */}
            <Link to="/register">
              <Button primary>
                S'inscrire
              </Button>
            </Link>
            <Link to="/login">
              <Button outline>
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;