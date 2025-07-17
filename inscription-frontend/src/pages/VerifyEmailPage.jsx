import React from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const VerifyEmailPage = () => {
  return (
    <section
      className="relative bg-cover bg-center flex items-center justify-center py-8 md:py-12 w-full h-full"
      style={{ backgroundImage: "url('/assets/images/forgot-bg.png')" }}
    >

      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-xl p-8 md:p-12 w-full max-w-lg mx-4">
        <div className="text-center mb-6">
          <img
            src="/assets/images/sent.png"
            alt="Sent Email Icon"
            className="w-16 h-16 mx-auto"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Vérifiez votre e-mail
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Le lien de réinitialisation de mot de passe a été envoyé à l'adresse e-mail{' '}
          <span className="font-semibold">j***@gmail.com</span> Veuillez cliquer sur ce lien pour activer votre compte
        </p>


        <Button outline size="lg" className="w-full">
          Se connecter
        </Button>

        <div className="flex justify-center items-center flex-wrap gap-x-2 mt-6 text-sm">
          <p className="text-gray-600">Vous n'avez pas reçu le mail ?</p>
          <button type="button" className="text-[#2A3B7C] hover:underline font-semibold focus:outline-none">
            Renvoyer le mail
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmailPage;