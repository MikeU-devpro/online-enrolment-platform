import React from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
const ForgotPasswordPage = () => {
  return (
    <section
      className="relative bg-cover bg-center flex items-center justify-center py-8 md:py-12 w-full h-full"
      style={{ backgroundImage: "url('/assets/images/login-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-xl p-8 md:p-12 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <img
            src="/assets/images/padlock.png"
            alt="Padlock Icon"
            className="w-16 h-16 mx-auto"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Mot de passe oublié ?
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Ne vous inquiétez pas, nous vous enverrons des instructions de réinitialisation
        </p>

        <form className="space-y-6">

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Veuillez entrer l'adresse email associée à votre compte"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <Button type="submit" primary size="lg" className="w-full">
            Envoyer le lien de réinitialisation
          </Button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <Link to="/login" className="text-gray-600 hover:underline">
            &larr; retour
          </Link>
          <button type="button" className="text-[#2A3B7C] hover:underline font-semibold focus:outline-none">
            renvoyer
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;