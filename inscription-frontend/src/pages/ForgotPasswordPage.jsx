import React, { useState } from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!email) {
      setError('Veuillez entrer votre adresse e-mail.');
      setIsLoading(false);
      return;
    }

    try {
      // Confirm this endpoint with your colleague, e.g., '/auth/forgot-password'
      const response = await api.post('/auth/forgot-password', { email });

      console.log('Password reset request successful:', response.data);
      setSuccessMessage('Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.');
      setEmail(''); // Clear the email field after submission
    } catch (err) {
      console.error('Password reset request failed:', err);
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Échec de l\'envoi du lien de réinitialisation. Veuillez vérifier votre adresse e-mail.');
        }
      } else if (err.request) {
        setError('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');
      } else {
        setError('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center text-sm mb-4">{successMessage}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" primary size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
          </Button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <Link to="/login" className="text-gray-600 hover:underline">
            &larr; retour
          </Link>
          <button
            type="button"
            className="text-[#2A3B7C] hover:underline font-semibold focus:outline-none"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Envoi...' : 'renvoyer'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;