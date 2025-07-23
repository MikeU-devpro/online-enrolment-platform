import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { useNavigate, useLocation } from 'react-router-dom'; // Link is no longer directly used for navigation
import api from '../services/api'; // Assuming 'api' is your Axios instance for backend calls

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState(''); // New state for the input code

  // Attempt to get email from navigation state, otherwise use a placeholder or prompt
  // In a real app, you might redirect to login/signup if email is not available in state.
  const [emailToVerify, setEmailToVerify] = useState(location.state?.email || '');

  useEffect(() => {
    if (location.state?.email) {
      setEmailToVerify(location.state.email);
    } else {
      // If no email is passed via state, it means the user might have arrived here directly
      // or refreshed the page. You might want to handle this by redirecting them
      // to a login/signup page or displaying an error prompting them to start over.
      setError("Impossible de vérifier l'e-mail sans l'adresse e-mail de l'utilisateur. Veuillez vous connecter ou vous inscrire de nouveau.");
    }
  }, [location.state?.email]);

  // Function to send a new verification code
  const handleResendCode = async () => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!emailToVerify) {
      setError('Impossible de renvoyer le code sans l\'adresse e-mail de l\'utilisateur.');
      setIsLoading(false);
      return;
    }

    try {
      // Backend endpoint to request a new verification code
      await api.post('/auth/resend-verification-code', { email: emailToVerify });
      setSuccessMessage('Un nouveau code de vérification a été envoyé à votre e-mail !');
      // Clear any previous code in case they want to retry
      setVerificationCode('');
    } catch (err) {
      console.error('Failed to resend code:', err);
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Échec du renvoi du code de vérification. Veuillez réessayer.');
        }
      } else if (err.request) {
        setError('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      } else {
        setError('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to submit the entered verification code
  const handleVerifyCode = async () => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!emailToVerify || !verificationCode) {
      setError('Veuillez fournir l\'e-mail et le code de vérification.');
      setIsLoading(false);
      return;
    }

    try {
      // Backend endpoint to verify the code
      const response = await api.post('/auth/verify-code', {
        email: emailToVerify,
        code: verificationCode,
      });

      setSuccessMessage('Compte vérifié avec succès ! Redirection vers le tableau de bord...');
      // Assuming a successful verification leads to a /dashboard page
      navigate('/dashboard', { replace: true }); // Use replace to prevent going back to verification page

    } catch (err) {
      console.error('Failed to verify code:', err);
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Code de vérification invalide ou expiré. Veuillez réessayer.');
        }
      } else if (err.request) {
        setError('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      } else {
        setError('Une erreur inattendue est survenue lors de la vérification.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to mask part of the email for display
  const getMaskedEmail = (email) => {
    if (!email || email === 'email@example.com') return 'votre e-mail';
    const [localPart, domainPart] = email.split('@');
    if (localPart.length <= 2) return `${localPart}***@${domainPart}`;
    return `${localPart.substring(0, 2)}***@${domainPart}`;
  };

  return (
    <section
      className="relative bg-cover bg-center flex items-center justify-center py-8 md:py-12 w-full h-full"
      style={{ backgroundImage: "url('/assets/images/forgot-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-xl p-8 md:p-12 w-full max-w-lg mx-4">
        <div className="text-center mb-6">
          <img
            src="/assets/images/sent.png" // Use an appropriate icon, maybe a code icon if available
            alt="Verification Code Icon"
            className="w-16 h-16 mx-auto"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Vérifiez votre e-mail
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Un code de vérification a été envoyé à l'adresse e-mail{' '}
          <span className="font-semibold">{getMaskedEmail(emailToVerify)}</span>. Veuillez saisir ce code ci-dessous pour activer votre compte.
        </p>

        {/* New Input Field for Verification Code */}
        <div className="mb-4">
          <label htmlFor="verificationCode" className="block text-gray-700 text-sm font-bold mb-2">
            Code de Vérification
          </label>
          <input
            type="text"
            id="verificationCode"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Entrez le code à 6 chiffres"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isLoading}
            maxLength="6" // Assuming a 6-digit code
          />
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center text-sm mb-4">{successMessage}</p>}

        <Button
          size="lg"
          className="w-full"
          onClick={handleVerifyCode} // This button now verifies the code
          disabled={isLoading || !verificationCode || !emailToVerify} // Disable if no code or email
        >
          {isLoading ? 'Vérification...' : 'Vérifier le code'}
        </Button>

        <div className="flex justify-center items-center flex-wrap gap-x-2 mt-6 text-sm">
          <p className="text-gray-600">Vous n'avez pas reçu le code ?</p>
          <button
            type="button"
            className="text-[#2A3B7C] hover:underline font-semibold focus:outline-none"
            onClick={handleResendCode} // This button now resends the code
            disabled={isLoading || !emailToVerify}
          >
            {isLoading ? 'Envoi...' : 'Renvoyer le code'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmailPage;