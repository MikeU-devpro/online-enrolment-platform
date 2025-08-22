import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DashboardHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState('');
    const [userInitials, setUserInitials] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const firstName = decodedToken.firstname || '';
                const lastName = decodedToken.lastname || '';
                
                // Construct the full name
                const fullName = (firstName && lastName) ? `${firstName} ${lastName}` : decodedToken.sub;
                setUserName(fullName);

                // Construct the initials
                if (firstName && lastName) {
                    setUserInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase());
                } else if (firstName) {
                    setUserInitials(firstName.charAt(0).toUpperCase());
                } else {
                    setUserInitials(''); // Or a default like 'U' for User
                }

            } catch (error) {
                console.error("Failed to decode token:", error);
                // Handle invalid token case, e.g., redirect to login
                // This is already handled by ProtectedRoute, so this is just for added safety
            }
        }
    }, []);

    const pageTitles = {
        '/dashboard': 'Tableau de bord',
        '/dashboard/faq': 'FAQ',
        '/dashboard/help': 'Aide',
    };
    
    const pageTitle = pageTitles[location.pathname] || 'Tableau de bord';
    
    const BackArrowIcon = '/assets/svg/back-arrow-icon.svg';
    const BellIcon = '/assets/svg/bell-icon.svg';

    return (
        <header className="bg-white p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center transition-colors mr-3"
                    style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '0.25rem',
                        background: '#E9EDF4',
                        padding: '0',
                    }}
                >
                    <img src={BackArrowIcon} alt="Retour" className="w-4 h-4" />
                </button>
                <h1
                    className="font-bold text-black"
                    style={{
                        fontSize: '2.5rem',
                        lineHeight: '143%',
                        letterSpacing: '0.0156rem',
                        fontFamily: 'Roboto, sans-serif',
                        color: '#1A202C',
                    }}
                >
                    {pageTitle}
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    className="flex items-center justify-center relative transition-colors"
                    style={{
                        width: '4.06rem',
                        height: '4.06rem',
                        borderRadius: '1.84rem',
                        padding: '0.5rem',
                    }}
                >
                    <img src={BellIcon} alt="Notifications" className="w-full h-full object-contain" />
                </button>

                <div className="flex items-center">
                    <div
                        className="flex items-center justify-center text-white font-semibold text-lg mr-3 flex-shrink-0"
                        style={{
                            width: '2.81rem',
                            height: '2.81rem',
                            borderRadius: '2.5rem',
                            background: '#101957',
                        }}
                    >
                        {userInitials}
                    </div>
                    <div>
                        <p
                            className="font-normal"
                            style={{
                                fontSize: '1rem',
                                lineHeight: '1.5rem',
                                verticalAlign: 'middle',
                                fontFamily: 'sans-serif',
                                color: '#333333',
                            }}
                        >
                            {userName}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;