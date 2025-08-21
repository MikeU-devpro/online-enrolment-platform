import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgramManagement = () => {
    const navigate = useNavigate();

    // Mock data for the programs table
    const programs = [
        { id: 1, name: 'Génie Logiciel', code: 'GL', fees: '250.000 F', capacity: 150, isOpen: true },
        { id: 2, name: 'Cybersécurité', code: 'CS', fees: '300.000 F', capacity: 120, isOpen: true },
        { id: 3, name: 'Science des Données', code: 'SD', fees: '280.000 F', capacity: 100, isOpen: false },
        { id: 4, name: 'Intelligence Artificielle', code: 'IA', fees: '320.000 F', capacity: 110, isOpen: true },
    ];

    const handleAddProgram = () => {
        navigate('/admin-dashboard/program-management/add');
    };

    const handleModifyProgram = (programId) => {
        navigate(`/admin-dashboard/program-management/edit/${programId}`);
    };

    const handleDeleteProgram = (programId) => {
        // Implement delete logic here
        console.log(`Deleting program with ID: ${programId}`);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#333333] text-[2.5rem] font-bold">Gestion des Filières</h2>
                <button
                    onClick={handleAddProgram}
                    className="py-2 px-6 rounded-md bg-[#101957] text-white font-semibold hover:bg-opacity-90 transition-colors"
                >
                    Ajouter une nouvelle filière
                </button>
            </div>

            <div className="w-full h-1 bg-[#101957] my-8"></div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#B6B8CB]">
                        <tr>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Nom de la Filière</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Code</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Frais d'Inscription</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Capacité Max.</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider" style={{ borderRight: '3px solid white' }}>Ouverte aux Inscriptions</th>
                            <th className="px-6 py-6 text-center text-white text-[1.2em] font-bold tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {programs.map((program) => (
                            <tr key={program.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{program.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{program.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{program.fees}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{program.capacity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center" style={{ borderRight: '3px solid white' }}>{program.isOpen ? 'Oui' : 'Non'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                                    <button
                                        onClick={() => handleModifyProgram(program.id)}
                                        className="py-1 px-3 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProgram(program.id)}
                                        className="py-1 px-3 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgramManagement;