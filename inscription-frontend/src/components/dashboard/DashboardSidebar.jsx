// src/components/dashboard/DashboardSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
    const navItems = [
        { name: 'Tableau de bord', icon: '/assets/svg/dashboard-icon.svg', path: '/dashboard', key: 'dashboard' },
        { name: 'Messagerie', icon: '/assets/svg/mail-icon.svg', path: '/dashboard/messages', key: 'messages' },
        { name: 'Paramètres', icon: '/assets/svg/settings-icon.svg', path: '/dashboard/settings', key: 'settings' },
        { name: 'FAQ', icon: '/assets/svg/faq-icon.svg', path: '/dashboard/faq', key: 'faq' },
        { name: 'Aide', icon: '/assets/svg/help-icon.svg', path: '/dashboard/help', key: 'help' },
    ];

    const igniteAcademyLogo = '/assets/images/logo.png';
    const logoutIcon = '/assets/svg/logout-icon.svg';
    const supportBoyImage = '/assets/images/support-boy-with-laptop.png';


    return (
        <div className="w-64 bg-[#1A2C3D] text-white flex flex-col p-4 shadow-lg h-full">
            <div className="flex items-center justify-center py-6">
                <img src={igniteAcademyLogo} alt="Ignite Academy Logo" className="h-10 mr-3" />
                <span className="text-2xl font-bold">Ignite Academy</span>
            </div>

            <nav className="flex-1 mt-8">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.key} className="mb-2">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                        isActive ? 'bg-[#3A506B] text-white' : 'hover:bg-[#3A506B] text-gray-300'
                                    }`
                                }
                                end={item.path === '/dashboard'}
                            >
                                <img src={item.icon} alt={`${item.name} icon`} className="mr-3 w-5 h-5" />
                                <span className="text-lg">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto p-4 bg-[#2A3E50] rounded-lg text-center mx-2 mb-4 relative overflow-hidden">
                <img
                    src={supportBoyImage}
                    alt="Support illustration"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-auto opacity-70"
                />
                <div className="relative z-10">
                    <p className="text-sm font-semibold mb-2">Support 24/7</p>
                    <p className="text-xs text-gray-400 mb-3">Contactez-nous à tout moment</p>
                    <button className="bg-[#6B4F8B] text-white text-sm px-4 py-2 rounded-full hover:bg-[#5C4278] transition-colors duration-200">
                        Rejoindre
                    </button>
                </div>
            </div>

            <div className="p-2 mx-2">
                <button
                    onClick={() => console.log('Disconnect clicked')}
                    className="flex items-center justify-center w-full p-3 rounded-lg text-red-400 hover:bg-[#3A506B] transition-colors duration-200"
                >
                    <img src={logoutIcon} alt="Déconnexion icon" className="mr-3 w-5 h-5" />
                    <span className="text-lg">Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;