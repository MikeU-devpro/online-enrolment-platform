import React, { useState } from 'react';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

// Helper function to convert pixels to rem (assuming 16px base)
const pxToRem = (px) => `${(px / 16).toFixed(2)}rem`;

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Veuillez entrer votre email et votre mot de passe.');
      setIsLoading(false);
      return;
    }

    try {
      // --- CORRECTION HERE: Change '/auth/authenticate' to '/auth/login' ---
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });

      console.log('Login successful:', response.data);
      const { token } = response.data;

      // Store the JWT token in local storage
      localStorage.setItem('jwt_token', token);

      // Redirect to the dashboard or wherever you want after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      if (err.response) {
        // Handle specific HTTP error codes from backend
        if (err.response.status === 403 || err.response.status === 401) {
          setError('Email ou mot de passe incorrect ou compte non activé.'); // More specific message
        } else if (err.response.data && err.response.data.message) {
          // If the backend sends a specific error message in the response body
          setError(err.response.data.message);
        } else {
          // Generic error for other backend errors
          setError('Échec de la connexion. Veuillez réessayer.');
        }
      } else if (err.request) {
        // The request was made but no response was received (e.g., server down, network issue)
        setError('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      } else {
        // Something else happened in setting up the request
        setError('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section
      className="relative flex items-center justify-center w-full h-full"
      style={{
        paddingTop: pxToRem(128 * 0.20),
        paddingBottom: pxToRem(128 * 0.20),
        backgroundImage: `linear-gradient(to right, #EFEFEF, #EFEFEF)`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background for the right 60% (image with clip-path), layered on top of the section's gradient */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{
          width: '60%',
          backgroundImage: `url('/assets/images/login-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)',
        }}
      ></div>


      <div
        className="relative z-10 bg-white shadow-xl overflow-hidden"
        style={{
          width: pxToRem(815.28),
          height: pxToRem(579.99),
          borderRadius: pxToRem(34.2),
          boxShadow: `0px 0px ${pxToRem(13.68)} 0px rgba(0, 0, 0, 0.25)`,
        }}
      >
        {/* Language Selector */}
        <div
          className="absolute"
          style={{
            top: pxToRem(32.83),
            left: pxToRem(78.11),
            zIndex: 20,
          }}
        >
          <div className="relative inline-block text-gray-700">
            <select
              className="block appearance-none bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-[#2A3B7C] focus:border-[#2A3B7C]"
              style={{
                borderRadius: pxToRem(0.34 * 16),
                paddingTop: pxToRem(0.45 * 16),
                paddingBottom: pxToRem(0.45 * 16),
                paddingLeft: pxToRem(0.68 * 16),
                paddingRight: pxToRem(1.80 * 16),
                fontSize: pxToRem(0.79 * 16),
                border: `${pxToRem(1)} solid #D1D5DB`,
              }}
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center" style={{ paddingRight: pxToRem(2 * 4), color: '#4A5568' }}>
              <svg className="fill-current" style={{ height: pxToRem(0.90 * 16), width: pxToRem(0.90 * 16) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Form on the left - Absolute positioned within the main box */}
        <div
          className="absolute"
          style={{
            width: pxToRem(348.82),
            height: pxToRem(369.52),
            top: pxToRem(133),
            left: pxToRem(27.36),
            opacity: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Connectez-vous à votre compte */}
          <h2
            className="text-gray-800"
            style={{
              width: pxToRem(348.8194580078125),
              height: pxToRem(64),
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: pxToRem(27.36),
              lineHeight: '100%',
              letterSpacing: pxToRem(0.24),
              marginTop: pxToRem(0),
              color: '#1A202C',
              textAlign: 'left',
              marginBottom: pxToRem( (20 * 1.25) * 1.20),
            }}
          >
            Connectez-vous à votre compte
          </h2>

          {error && (
            <p className="text-red-500 text-center" style={{ fontSize: pxToRem(12), marginBottom: pxToRem(10 * 1.20) }}>{error}</p>
          )}

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative" style={{ marginBottom: pxToRem(20) }}>
              <label
                htmlFor="email"
                className="absolute text-gray-700"
                style={{
                  top: pxToRem(-11),
                  left: pxToRem(11.5),
                  backgroundColor: 'white',
                  padding: `0 ${pxToRem(3)}`,
                  fontSize: pxToRem(11.5),
                  zIndex: 10,
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{
                  width: pxToRem(340.61),
                  height: pxToRem(38.30),
                  borderTopLeftRadius: pxToRem(2.74),
                  borderTopRightRadius: pxToRem(2.74),
                  padding: `${pxToRem(10)} ${pxToRem(12)}`,
                  border: `${pxToRem(1)} solid #d1d5db`,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative" style={{ marginBottom: pxToRem( (13.68 / 2 * 1.25) * 1.15) }}>
              <label
                htmlFor="password"
                className="absolute text-gray-700"
                style={{
                  top: pxToRem(-11),
                  left: pxToRem(11.5),
                  backgroundColor: 'white',
                  padding: `0 ${pxToRem(3)}`,
                  fontSize: pxToRem(11.5),
                  zIndex: 10,
                }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  className="shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{
                    width: pxToRem(340.61),
                    height: pxToRem(38.30),
                    borderTopLeftRadius: pxToRem(2.74),
                    borderTopRightRadius: pxToRem(2.74),
                    padding: `${pxToRem(10)} ${pxToRem(12)}`,
                    border: `${pxToRem(1)} solid #d1d5db`,
                    paddingRight: pxToRem(35),
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                  style={{ paddingRight: pxToRem(11), color: '#9CA3AF' }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg style={{ width: pxToRem(18.08), height: pxToRem(18.08) }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .59-1.874 1.545-3.64 2.898-5.07L4.545 5.545M19.07 19.07a10.05 10.05 0 00.93-2.07c1.274-4.057-2.517-7-7.042-7a10.05 10.05 0 00-2.07-.93M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg style={{ width: pxToRem(18.08), height: pxToRem(18.08) }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between" style={{ marginTop: pxToRem( (10 / 2 * 1.25) * 1.20) }}>
              <div className="flex items-center" style={{ gap: pxToRem(6.84) }}>
                {/* Custom Toggle Switch based on image */}
                <label htmlFor="rememberMe" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="sr-only"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div
                      className="block bg-gray-300 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: pxToRem(30),
                        height: pxToRem(16),
                        boxShadow: `inset 0 0 0 ${pxToRem(2)} rgba(0,0,0,0.2)`,
                      }}
                    ></div>
                    <div
                      className={`absolute left-0 top-0 bg-white rounded-full transition-all duration-300 ease-in-out`}
                      style={{
                        width: pxToRem(14),
                        height: pxToRem(14),
                        transform: rememberMe ? `translateX(${pxToRem(14)})` : 'translateX(0)',
                        margin: pxToRem(1),
                        boxShadow: `0 ${pxToRem(1)} ${pxToRem(2)} rgba(0,0,0,0.25)`,
                      }}
                    ></div>
                    {/* Inner dot of the toggle switch */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
                        rememberMe ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        width: pxToRem(6),
                        height: pxToRem(6),
                        backgroundColor: '#101957',
                        top: '50%',
                        left: rememberMe ? `calc(50% + ${pxToRem(7)})` : `calc(50% - ${pxToRem(7)})`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    ></div>
                  </div>
                  <span
                    className="text-gray-700 whitespace-nowrap"
                    style={{
                      fontSize: pxToRem(14),
                      marginLeft: pxToRem(10),
                    }}
                  >
                    Se souvenir de moi
                  </span>
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-[#2A3B7C] hover:underline whitespace-nowrap"
                style={{
                  fontFamily: 'sans-serif',
                  fontWeight: 400,
                  fontSize: pxToRem(9.58),
                  lineHeight: pxToRem(13.68),
                  letterSpacing: pxToRem(0.17),
                }}
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Se connecter Button */}
            <Button
              type="submit"
              disabled={isLoading}
              style={{
                width: pxToRem(340.61),
                height: pxToRem(38.23),
                backgroundColor: 'white',
                color: '#101957',
                border: `${pxToRem(1)} solid #101957`,
                borderRadius: pxToRem(4.1),
                paddingTop: pxToRem(5.47),
                paddingRight: pxToRem(10.95),
                paddingBottom: pxToRem(5.47),
                paddingLeft: pxToRem(10.95),
                marginTop: pxToRem( (10 * 1.25) * 1.20),
              }}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          {/* Or connect with */}
          <div className="relative flex items-center" style={{ marginTop: pxToRem( (5 * 1.25) * 1.20) }}>
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-2 text-gray-500" style={{ fontSize: pxToRem(12) }}>ou connectez-vous avec</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row" style={{ gap: pxToRem(2.74), marginTop: pxToRem( (5 * 1.25) * 1.20) }}>
            <button
              className="flex items-center justify-center shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              type="button"
              style={{
                width: pxToRem(162.78),
                height: pxToRem(35.57),
                borderRadius: pxToRem(4.1),
                border: `${pxToRem(0.68)} solid #999999`,
                paddingTop: pxToRem(4.1),
                paddingRight: pxToRem(38.3),
                paddingBottom: pxToRem(4.1),
                paddingLeft: pxToRem(38.3),
                gap: pxToRem(2.74),
              }}
            >
              <img src="/assets/images/google-icon.png" alt="Google Icon" style={{ width: pxToRem(36), height: pxToRem(36), marginRight: pxToRem(7.2) }} />
              Google
            </button>
            <button
              className="flex items-center justify-center shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              type="button"
              style={{
                width: pxToRem(162.78),
                height: pxToRem(35.57),
                borderRadius: pxToRem(4.1),
                border: `${pxToRem(0.68)} solid #999999`,
                paddingTop: pxToRem(4.1),
                paddingRight: pxToRem(38.3),
                paddingBottom: pxToRem(4.1),
                paddingLeft: pxToRem(38.3),
                gap: pxToRem(2.74),
              }}
            >
              <img src="/assets/images/apple-icon.png" alt="Apple Icon" style={{ width: pxToRem(36), height: pxToRem(36), marginRight: pxToRem(7.2) }} />
              Apple
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600"
               style={{
                  fontSize: pxToRem(12),
                  marginTop: pxToRem( (10 * 1.25) * 1.20),
                  marginBottom: pxToRem(29)
               }}
          >
            Vous n'avez pas encore de compte ?{' '}
            <Link to="/register" className="text-[#2A3B7C] hover:text-[#3B4B8D] font-bold">
              Inscrivez-vous
            </Link>
          </p>
        </div>

        {/* Image Section - Absolute positioned within the main box */}
        <div
          className="hidden md:block bg-cover bg-center absolute"
          style={{
            width: pxToRem(423.97),
            height: pxToRem(563.58),
            top: pxToRem(8.21),
            left: pxToRem(382.72),
            borderRadius: pxToRem(33.22),
            backgroundImage: `url('/assets/images/login-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)',
          }}
        >
        </div>
      </div>
Democrats aren’t forming a secret police, trying to send my friends to concentration camps, get trans people to kill themselves,
    </section>
  );
};

export default LoginPage;