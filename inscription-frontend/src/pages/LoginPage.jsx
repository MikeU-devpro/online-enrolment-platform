import React from 'react';
import Button from '../components/common/Button'; // Assuming you have a Button component
import { Link } from 'react-router-dom'; // Import Link for navigation

const LoginPage = () => {
  return (
    <section
      className="relative flex items-center justify-center py-8 md:py-12 w-full h-full" // Adjusted classes for full height fitting
      style={{
        // Main page background: light gray on left, image on right, tilted at 85 degrees
        // The gradient layer comes first, covering the left part with light gray and making it transparent on the right
        // The background image then shows through on the transparent part (the right side)
        backgroundImage: `linear-gradient(85deg, #f5f5f5 40%, rgba(245,245,245,0) 40%), url('/assets/images/login-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Removed the black overlay div as the background style now handles the effect directly */}

      {/* Main Login Box - Now a flex container for two parts */}
      <div className="relative z-10 flex bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl mx-4">
        {/* Left Part: Form Section */}
        <div className="w-full md:w-3/5 p-6 md:p-10"> {/* Adjust padding as needed */}
          {/* Language Dropdown */}
          <div className="flex justify-end mb-4">
            <div className="relative inline-block text-gray-700">
              <select
                className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-[#2A3B7C] focus:border-[#2A3B7C] text-sm"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            Connectez-vous à votre compte
          </h2>

          <form className="space-y-5">

            <div>
              <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Entrez votre nom"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                />

                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="h-4 w-4 text-[#2A3B7C] rounded focus:ring-[#2A3B7C]"
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-700 text-sm">
                  Se souvenir de moi
                </label>
              </div>
              <Link to="/forgot-password" className="text-[#2A3B7C] hover:underline text-sm font-semibold">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" primary size="lg" className="w-full mt-6">
              Se connecter
            </Button>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">ou connectez-vous avec</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
            <button
              className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              type="button"
            >
              <img src="/assets/images/google-icon.png" alt="Google Icon" className="w-10 h-10 mr-2" /> Google
            </button>
            <button
              className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              type="button"
            >
              <img src="/assets/images/apple-icon.png" alt="Apple Icon" className="w-10 h-10 mr-2" /> Apple
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Vous n'avez pas encore de compte ?{' '}
            <Link to="/register" className="text-[#2A3B7C] hover:text-[#3B4C8D] font-bold">
              Inscrivez-vous
            </Link>
          </p>
        </div>

        <div
          className="hidden md:block w-2/5 bg-cover bg-center"
          style={{

            backgroundImage: `linear-gradient(85deg, #d0d0d0 2px, transparent 2px), url('/assets/images/login-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >

        </div>
      </div>
    </section>
  );
};

export default LoginPage;