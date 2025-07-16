import React from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';

const Footer = () => {
  return (

    <footer className="bg-white text-gray-800 py-10 px-6 md:px-12 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-8 md:space-y-0">

          <div className="flex flex-col items-start space-y-6">
            <Logo />
            <div className="flex space-x-4">
  
              <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C17.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2.72v13.56c0 .11.1.2.2.2h13.56c.11 0 .2-.1.2-.2V7.8c0-.11-.1-.2-.2-.2H7.8c-.11 0-.2.1-.2.2zM7.8 6.5C7.8 5.67 8.47 5 9.3 5h5.4c.83 0 1.5.67 1.5 1.5V14.7c0 .83-.67 1.5-1.5 1.5H9.3c-.83 0-1.5-.67-1.5-1.5V6.5zm5.55 3.3c-.56 0-1.01.45-1.01 1.01s.45 1.01 1.01 1.01 1.01-.45 1.01-1.01-.45-1.01-1.01-1.01zM18.8 5.7c0-.5-.4-.9-1.2-.9s-1.2.4-1.2.9.4.9 1.2.9 1.2-.4 1.2-.9z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.954 11.045L15.93 7H19.5L14.717 12.639L19.999 20H15.908L11.724 14.819L7.91 20H4.5L9.682 13.361L4 7H8.257L11.954 11.045ZM16.326 19L5.38 5.76H8.78L19.72 19H16.326Z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-1.042-.338-2.143-.538-3.265-.547C13.268 2.585 12 2.5 12 2.5S8.732 2.585 7.65 2.637c-1.122.009-2.223.209-3.265.547C3.12 3.738 2.5 4.7 2.5 6.037v11.926C2.5 19.3 3.12 20.262 4.385 20.816c1.042.338 2.143.538 3.265.547C10.732 21.415 12 21.5 12 21.5s3.268-.085 4.35-.137c1.122-.009 2.223-.209 3.265-.547C20.88 20.262 21.5 19.3 21.5 17.963V6.037C21.5 4.7 20.88 3.738 19.615 3.184zM9.937 15.352V8.648L15.342 12l-5.405 3.352z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.12 20.45H3.59V9.12h3.53v11.33zM5.35 7.64c-1.12 0-1.93-.83-1.93-1.87-.01-1.06.8-1.87 1.93-1.87 1.14 0 1.93.81 1.94 1.87 0 1.04-.8-1.87-1.94-1.87zm15.42 12.81h-3.53V14.7c0-1.3-.47-2.18-1.61-2.18-1.14 0-1.83.77-1.83 2.13v5.8h-3.53s.05-10.37 0-11.33h3.53v1.61c.47-.77 1.4-1.87 3.19-1.87 2.33 0 4.08 1.5 4.08 4.7v6.89z"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.54 2 2.08 6.45 2.02 11.95V22l4.98-1.6c1.4-.87 3.1-.9 4.6-.3L12.04 22c5.5-.05 9.96-4.5 10-10C22.02 6.5 17.56 2 12.04 2zM17.5 16.5c-.2-.1-.7-.3-.8-.3-.2 0-.4 0-.5.2-.1.2-.4.4-.5.5-.1.1-.3.1-.5 0-.2-.1-.7-.3-1.2-.7-.5-.4-.9-.9-1.2-1.3-.3-.4-.1-.5 0-.6.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4-.1-.1-.5-.4-.5-.6-.1-.2-.2-.2-.4-.2-.2 0-.4 0-.6.2-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1.2.2.4.3.2.1.8.4 1.6.8.8.4 1.4.6 1.8.6.5 0 .9-.2 1.2-.4.3-.2.5-.5.6-.7.1-.2.2-.4.2-.6 0-.2-.1-.3-.3-.4z"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="text-gray-700 hover:text-[#2A3B7C] transition duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.09 0H12v24h.09c.8 0 1.58-.2 2.3-.6s1.3-.9 1.83-1.57c.53-.67.8-1.5.8-2.3c0-.8-.3-1.6-.8-2.3s-1.03-1.3-1.83-1.7c-.72-.4-1.5-.5-2.3-.5h-.09V10h-.09c-.8 0-1.58.2-2.3.6s-1.3.9-1.83 1.57c-.53.67-.8 1.5-.8 2.3c0 .8.3 1.6.8 2.3s1.03 1.3 1.83 1.7c.72.4 1.5.5 2.3.5h.09V24H0V0h12.09z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end text-right space-y-6">
            <p className="text-xl font-semibold text-gray-800 max-w-sm">
              Préparez-vous à libérer votre potentiel. L'ambition rencontre la réussite.
            </p>

            <div className="flex space-x-6 text-lg font-medium text-gray-700">
              <a href="#" className="hover:text-[#2A3B7C] transition duration-200">Accueil</a>
              <a href="#" className="hover:text-[#2A3B7C] transition duration-200">Nos Filières</a>
              <a href="#" className="hover:text-[#2A3B7C] transition duration-200">Contact</a>
            </div>
            <div className="flex space-x-4">
              <Button primary>S'inscrire</Button>
              <Button outline>Se connecter</Button>
            </div>
          </div>
        </div>


        <hr className="border-gray-300 my-8" /> 

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} IgniteAcademy. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#2A3B7C] transition duration-200">Conditions d'utilisation</a>
            <a href="#" className="hover:text-[#2A3B7C] transition duration-200">Politique de confidentialité</a>
            <a href="#" className="hover:text-[#2A3B7C] transition duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;