import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentEnrollmentManagement = ({ onViewDetails }) => {
    const navigate = useNavigate();
    const [selectedEnrollments, setSelectedEnrollments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 68;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);

    const enrollmentData = [
        { id: 'IA-12345', studentName: 'Mbienda Jean', major: 'Génie Logiciel', submissionDate: '3h40\n4/août/2025', status: 'Soumis' },
        { id: 'IA-12346', studentName: 'Ngueh Marie', major: 'Cybersécurité', submissionDate: '9h15\n3/août/2025', status: 'Validé' },
        { id: 'IA-12347', studentName: 'Fomuso Paul', major: 'Science des Données', submissionDate: '14h20\n2/août/2025', status: 'Soumis' },
        { id: 'IA-12348', studentName: 'Njoh Esther', major: 'Intelligence Artificielle', submissionDate: '22h00\n1/août/2025', status: 'Refusé' },
        { id: 'IA-12349', studentName: 'Fouda Aissatou', major: 'Génie Électrique', submissionDate: '10h30\n1/août/2025', status: 'Soumis' },
        { id: 'IA-12350', studentName: 'Kamga Thomas', major: 'Génie Civil', submissionDate: '18h55\n31/juillet/2025', status: 'Validé' },
        { id: 'IA-12351', studentName: 'Awah Chloe', major: 'Biologie', submissionDate: '07h00\n30/juillet/2025', status: 'Soumis' },
        { id: 'IA-12352', studentName: 'Zang Maxime', major: 'Chimie', submissionDate: '11h45\n29/juillet/2025', status: 'Validé' },
    ];

    const handleSelectEnrollment = (id) => {
        setSelectedEnrollments((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((enrollmentId) => enrollmentId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = enrollmentData.map(enrollment => enrollment.id);
            setSelectedEnrollments(allIds);
        } else {
            setSelectedEnrollments([]);
        }
    };

    const isAllSelected = selectedEnrollments.length === enrollmentData.length && enrollmentData.length > 0;

    const actionButtonStyle = "py-2 px-4 rounded-md border transition-colors duration-200"

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const previousBtnColor = isFirstPage ? 'text-[#999999]' : 'text-[#1E1E1E]';
    const nextBtnColor = isLastPage ? 'text-[#999999]' : 'text-[#1E1E1E]';

    return (
        <div className="p-8">
            {/* Top Section with Title, Hamburger Menu, and Search Bar */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#333333] text-[2.5rem] font-bold">Gestion des Inscriptions</h2>
                <div className="flex items-center space-x-4">
                    {/* Hamburger Menu for Dropdowns */}
                    <div className="relative">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-700 flex items-center border border-gray-300 rounded-md">
                            <div className="flex flex-col items-center justify-center space-y-1">
                                <span className="block h-0.5 w-6 bg-gray-600"></span>
                                <span className="block h-0.5 w-6 bg-gray-600"></span>
                                <span className="block h-0.5 w-6 bg-gray-600"></span>
                            </div>
                            <div className="ml-2 flex flex-wrap gap-1">
                                {selectedStatus && <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs font-semibold">{selectedStatus}</span>}
                                {selectedMajor && <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs font-semibold">{selectedMajor}</span>}
                                {selectedAcademicYear && <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs font-semibold">{selectedAcademicYear}</span>}
                            </div>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-0 left-full mt-0 ml-2 w-48 bg-[#999999] rounded-md shadow-lg py-1 z-20">
                                <ul className="space-y-1">
                                    <li className="relative">
                                        <button onClick={() => setActiveDropdown(activeDropdown === 'statut' ? null : 'statut')} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Statut</button>
                                        {activeDropdown === 'statut' && (
                                            <div className="absolute left-full top-0 mt-0 ml-2 w-48 bg-[#999999] rounded-md shadow-lg py-1 z-30">
                                                <button onClick={() => { setSelectedStatus(null); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Tous</button>
                                                <button onClick={() => { setSelectedStatus('Soumis'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Soumis</button>
                                                <button onClick={() => { setSelectedStatus('Validé'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Validé</button>
                                                <button onClick={() => { setSelectedStatus('Refusé'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Refusé</button>
                                            </div>
                                        )}
                                    </li>
                                    <li className="relative">
                                        <button onClick={() => setActiveDropdown(activeDropdown === 'filiere' ? null : 'filiere')} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Filière</button>
                                        {activeDropdown === 'filiere' && (
                                            <div className="absolute left-full top-0 mt-0 ml-2 w-48 bg-[#999999] rounded-md shadow-lg py-1 z-30">
                                                <button onClick={() => { setSelectedMajor(null); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Tous</button>
                                                <button onClick={() => { setSelectedMajor('Génie Logiciel'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Génie Logiciel</button>
                                                <button onClick={() => { setSelectedMajor('Cybersécurité'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Cybersécurité</button>
                                                <button onClick={() => { setSelectedMajor('Science des Données'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Science des Données</button>
                                                <button onClick={() => { setSelectedMajor('Intelligence Artificielle'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Intelligence Artificielle</button>
                                                <button onClick={() => { setSelectedMajor('Génie Électrique'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Génie Électrique</button>
                                                <button onClick={() => { setSelectedMajor('Génie Civil'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Génie Civil</button>
                                                <button onClick={() => { setSelectedMajor('Biologie'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Biologie</button>
                                                <button onClick={() => { setSelectedMajor('Chimie'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Chimie</button>
                                            </div>
                                        )}
                                    </li>
                                    <li className="relative">
                                        <button onClick={() => setActiveDropdown(activeDropdown === 'annee' ? null : 'annee')} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Année Académique</button>
                                        {activeDropdown === 'annee' && (
                                            <div className="absolute left-full top-0 mt-0 ml-2 w-48 bg-[#999999] rounded-md shadow-lg py-1 z-30">
                                                <button onClick={() => { setSelectedAcademicYear(null); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">Tous</button>
                                                <button onClick={() => { setSelectedAcademicYear('2025-2026'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">2025-2026</button>
                                                <button onClick={() => { setSelectedAcademicYear('2024-2025'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">2024-2025</button>
                                                <button onClick={() => { setSelectedAcademicYear('2023-2024'); setIsMenuOpen(false); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-white hover:bg-[#666666]">2023-2024</button>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Rechercher"
                        className="p-2 rounded-md border border-gray-300 w-96"
                    />
                </div>
            </div>

            {/* Thick Horizontal Line */}
            <div className="w-full h-1 bg-[#101957] my-8"></div>

            {/* Action Buttons */}
            {selectedEnrollments.length > 0 && (
                <div className="flex gap-2 mb-4">
                    <button
                        className={`${actionButtonStyle} text-[#101957] border-[#101957] bg-white hover:bg-[#101957] hover:text-white`}
                    >
                        Activer
                    </button>
                    <button
                        className={`${actionButtonStyle} text-[#101957] border-[#101957] bg-white hover:bg-[#101957] hover:text-white`}
                    >
                        Suspendre
                    </button>
                    <button
                        className={`${actionButtonStyle} text-[#FF3838] border-[#FF3838] bg-white hover:bg-[#FF3838] hover:text-white`}
                    >
                        Supprimer
                    </button>
                </div>
            )}
            
            {/* Main Table Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#B6B8CB]">
                        <tr>
                            <th className="px-6 py-6 text-left text-white text-[1.2em] font-bold tracking-wider rounded-tl-xl" style={{ borderRight: '3px solid white' }}>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={isAllSelected}
                                    className="w-8 h-8"
                                />
                            </th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>ID Inscription</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Nom Étudiant</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Filière</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Date Soumission</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Statut</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {enrollmentData.map((enrollment) => (
                            <tr key={enrollment.id} className={selectedEnrollments.includes(enrollment.id) ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedEnrollments.includes(enrollment.id)}
                                        onChange={() => handleSelectEnrollment(enrollment.id)}
                                        className="w-8 h-8"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{enrollment.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{enrollment.studentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{enrollment.major}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>
                                    {enrollment.submissionDate.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            {index === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{enrollment.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => onViewDetails(enrollment)}
                                        className="py-1 px-3 rounded-md bg-white text-[#999999] border transition-all duration-200
                                        hover:bg-gray-100 hover:border-gray-500 hover:text-gray-500
                                        active:bg-gray-200 active:border-blue-700 active:text-blue-700"
                                        style={{ borderColor: '#999999', borderWidth: '0.7px' }}>
                                        Voir les Détails
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-end items-center mt-4">
                <div className="flex-1 flex justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Précédent </a>
                    <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Suivant </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={handlePrevious}
                                disabled={isFirstPage}
                                className={`relative inline-flex items-center px-6 py-3 text-base font-medium bg-transparent border-b border-black/10 rounded-l-md ${previousBtnColor}`}
                                style={{ gap: '0.3rem', opacity: isFirstPage ? '0.5' : '1' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Précédent
                            </button>
                            <a href="#" aria-current="page"
                                className="relative inline-flex items-center px-6 py-3 text-base font-medium bg-transparent text-[#1E1E1E] border-b border-black/10"
                            > 1 </a>
                            <a href="#"
                                className="relative inline-flex items-center px-6 py-3 text-base font-medium bg-transparent text-[#1E1E1E] border-b border-black/10"
                            > 2 </a>
                            <a href="#"
                                className="relative hidden md:inline-flex items-center px-6 py-3 text-base font-medium bg-transparent text-[#1E1E1E] border-b border-black/10"
                            > 3 </a>
                            <span
                                className="relative inline-flex items-center px-6 py-3 text-base font-medium bg-transparent text-[#1E1E1E] border-b border-black/10"
                            > ... </span>
                            <a href="#"
                                className="relative hidden md:inline-flex items-center px-6 py-3 text-base font-medium bg-transparent text-[#1E1E1E] border-b border-black/10"
                            > 67 </a>
                            <a href="#"
                                className="relative inline-flex items-center px-6 py-3 text-base font-medium bg-transparent text-[#1E1E1E] border-b border-black/10"
                            > 68 </a>
                            <button
                                onClick={handleNext}
                                disabled={isLastPage}
                                className={`relative inline-flex items-center px-6 py-3 text-base font-medium bg-transparent border-b border-black/10 rounded-r-md ${nextBtnColor}`}
                                style={{ gap: '0.3rem', opacity: isLastPage ? '0.5' : '1' }}
                            >
                                Suivant
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentEnrollmentManagement;