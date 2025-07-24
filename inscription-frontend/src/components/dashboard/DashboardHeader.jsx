import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ pageTitle, userName, userEmail }) => {
    const navigate = useNavigate();

    const displayUserName = userName || 'Nom associé à l\'email';
    const displayUserEmail = userEmail || 'utilisateur@example.com';

    const userInitials = (displayUserName.charAt(0) + (displayUserEmail.charAt(0) || '')).toUpperCase();

    const BackArrowIcon = '/assets/svg/back-arrow-icon.svg';
    const BellIcon = '/assets/svg/bell-icon.svg';

    return (
        <header className="bg-white p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
                >
                    <img src={BackArrowIcon} alt="Retour" className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">{pageTitle || 'Tableau de bord'}</h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                    <img src={BellIcon} alt="Notifications" className="w-6 h-6" />
                </button>

                <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#6B4F8B] rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3 flex-shrink-0">
                        {userInitials}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{displayUserName}</p>
                        <p className="text-xs text-gray-500">{displayUserEmail}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;