import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProgramForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        fees: '',
        capacity: '',
        startDate: '',
        endDate: '',
    });

    // Mock data for editing
    useEffect(() => {
        if (isEditing) {
            // In a real app, you would fetch data for the specific ID
            const mockData = {
                id: 1,
                name: 'Génie Logiciel',
                code: 'GL',
                description: 'Formation complète en génie logiciel...',
                fees: '250000',
                capacity: '150',
                startDate: '2025-09-01',
                endDate: '2025-10-31',
            };
            setFormData(mockData);
        }
    }, [isEditing, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            console.log('Updating program:', formData);
            // Implement update logic here
        } else {
            console.log('Adding new program:', formData);
            // Implement add logic here
        }
        // Navigate back to the management page after submission
        navigate('/admin-dashboard/program-management');
    };

    const handleCancel = () => {
        navigate('/admin-dashboard/program-management');
    };

    return (
        <div className="p-8">
            <h2 className="text-[#333333] text-[2.5rem] font-bold mb-4">
                {isEditing ? `Modifier Filière: ${formData.name}` : 'Ajouter une Filière'}
            </h2>
            <div className="w-full h-1 bg-[#101957] my-8"></div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <label htmlFor="name" className="block text-[#333333] text-lg font-normal mb-2">Nom de la Filière</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="code" className="block text-[#333333] text-lg font-normal mb-2">Code de la Filière</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-lg"
                            required
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="description" className="block text-[#333333] text-lg font-normal mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full h-32 p-4 rounded-md border border-gray-300 text-lg resize-none"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="fees" className="block text-[#333333] text-lg font-normal mb-2">Frais d'Inscription</label>
                        <input
                            type="number"
                            id="fees"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="capacity" className="block text-[#333333] text-lg font-normal mb-2">Capacité Maximale</label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-[#333333] text-lg font-normal mb-2">Date Début Inscriptions</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-[#333333] text-lg font-normal mb-2">Date Fin Inscriptions</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-lg"
                            required
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="py-2 px-6 rounded-md border border-gray-400 text-[#333333] font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-6 rounded-md bg-[#101957] text-white font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProgramForm;