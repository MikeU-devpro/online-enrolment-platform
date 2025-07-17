import React from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6 px-6 md:px-12 mt-6"> {/* Reduced py-10 to py-6 */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-8 md:space-y-0">
          <div className="flex flex-col items-start space-y-6">
            <Logo />
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="transition duration-200">
                <img src="/assets/svg/facebook-icon.svg" alt="Facebook Icon" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="transition duration-200">
                <img src="/assets/svg/instagram-icon.svg" alt="Instagram Icon" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="transition duration-200">
                <img src="/assets/svg/twitter-icon.svg" alt="Twitter Icon" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="transition duration-200">
                <img src="/assets/svg/youtube-icon.svg" alt="YouTube Icon" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition duration-200">
                <img src="/assets/svg/linkedin-icon.svg" alt="LinkedIn Icon" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="WhatsApp" className="transition duration-200">
                <img src="/assets/svg/whatsapp-icon.svg" alt="WhatsApp Icon" className="w-6 h-6" />
              </a>
              <a href="#" aria-label="TikTok" className="transition duration-200">
                <img src="/assets/svg/tiktok-icon.svg" alt="TikTok Icon" className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end text-right space-y-6">
            <p className="text-xl font-semibold text-gray-800 max-w-sm">
              Préparez-vous à libérer votre potentiel. L'ambition rencontre la réussite.
            </p>

            <div className="flex space-x-6 text-lg font-medium text-gray-700">
              <Link to="/" className="hover:text-[#2A3B7C] transition duration-200">Accueil</Link>
              <Link to="/courses" className="hover:text-[#2A3B7C] transition duration-200">Nos Filières</Link>
              <Link to="/contact" className="hover:text-[#2A3B7C] transition duration-200">Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/register">
                <Button primary>S'inscrire</Button>
              </Link>
              <Link to="/login">
                <Button outline>Se connecter</Button>
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} IgniteAcademy. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-[#2A3B7C] transition duration-200">Conditions d'utilisation</Link>
            <Link to="/privacy" className="hover:text-[#2A3B7C] transition duration-200">Politique de confidentialité</Link>
            <Link to="/cookies" className="hover:text-[#2A3B7C] transition duration-200">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;