import React from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className="bg-white text-gray-800 py-[0.55rem] px-[0.85rem] md:px-[1.75rem] mt-[0.165rem]" // Margin top decreased by 70%
    >
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start mb-[1.19rem] space-y-[1.19rem] md:space-y-0">
          <div className="flex flex-col items-start space-y-[0.93rem]">
            <Logo />
            <div className="flex space-x-[0.79rem]">
              <a href="#" aria-label="Facebook" className="transition duration-200">
                <img src="/assets/svg/facebook-icon.svg" alt="Facebook Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
              <a href="#" aria-label="Instagram" className="transition duration-200">
                <img src="/assets/svg/instagram-icon.svg" alt="Instagram Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
              <a href="#" aria-label="Twitter" className="transition duration-200">
                <img src="/assets/svg/twitter-icon.svg" alt="Twitter Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
              <a href="#" aria-label="YouTube" className="transition duration-200">
                <img src="/assets/svg/youtube-icon.svg" alt="YouTube Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition duration-200">
                <img src="/assets/svg/linkedin-icon.svg" alt="LinkedIn Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
              <a href="#" aria-label="WhatsApp" className="transition duration-200">
                <img src="/assets/svg/whatsapp-icon.svg" alt="WhatsApp Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
              <a href="#" aria-label="TikTok" className="transition duration-200">
                <img src="/assets/svg/tiktok-icon.svg" alt="TikTok Icon" className="w-[1.19rem] h-[1.19rem]" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-[0.79rem]">
            <p className="text-[0.99rem] text-gray-800 max-w-sm">
              Préparez-vous à libérer votre potentiel. L'ambition rencontre la réussite.
            </p>

            <div className="flex space-x-[1.19rem] text-[0.89rem] font-bold text-gray-700 ">
              <Link to="/" className="hover:text-[#2A3B7C] transition duration-600">Accueil</Link>
              <Link to="/courses" className="hover:text-[#2A3B7C] transition duration-600">Nos Filières</Link>
              <Link to="/contact" className="hover:text-[#2A3B7C] transition duration-600">Contact</Link>
            </div>
            <div className="flex space-x-[0.79rem]">
              <Link to="/register">
                <Button primary>S'inscrire</Button>
              </Link>
              <Link to="/login">
                <Button secondary>Se connecter</Button>
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-[1.19rem]" />

        <div className="flex flex-col md:flex-row justify-between items-center text-[0.69rem] text-gray-600 space-y-[0.39rem] md:space-y-0">
          <p>&copy; {new Date().getFullYear()} IgniteAcademy. All rights reserved.</p>
          <div className="flex space-x-[1.19rem]">
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