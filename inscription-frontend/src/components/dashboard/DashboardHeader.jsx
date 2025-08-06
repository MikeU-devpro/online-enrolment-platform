import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const DashboardHeader = ({ pageTitle }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const displayUserName = user?.name || 'Nom associé à l\'email';

    let userInitials = '';
    if (user && user.name) {
        const nameParts = user.name.split(' ');
        if (nameParts.length > 1) {
            userInitials = `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
        } else {
            userInitials = nameParts[0].charAt(0).toUpperCase();
        }
    }

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
                    {pageTitle || 'Tableau de bord'}
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
                            {displayUserName}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;