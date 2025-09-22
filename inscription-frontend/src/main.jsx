import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

//import stripe function
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


// add stripe public key
const stripePromise = loadStripe("pk_test_51RwRkpB8xDJAlUH6I0mr0d1tUnziR40lB3cEXXs0nCz6vz1YK7cyIwyztMPqcY67XY6c9oRNOlkEUzQx0inRHRti00nH3MJoI8");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                {/* Pass the stripePromise to the Elements provider */}
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);