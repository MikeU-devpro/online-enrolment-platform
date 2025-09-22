import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Reusable component for displaying static information
const DetailField = ({ label, value }) => (
    <div>
        <label className="block text-[#333333] text-base font-normal mb-1">{label}</label>
        <div
            className="w-full h-12 px-4 rounded-sm border border-[#79747E] text-[#333333] flex items-center bg-gray-100"
            style={{ fontSize: '1.5rem', fontFamily: 'Roboto, sans-serif' }}
        >
            {value}
        </div>
    </div>
);

// Reusable component for displaying documents with admin actions
const DocumentDetailField = ({ label, fileState, onValidate, onReject }) => {
    const getStatusText = (status) => {
        switch (status) {
            case 'loading':
                return 'Chargement...';
            case 'validated':
                return 'Validé';
            case 'rejected':
                return 'Rejeté';
            case 'en_attente':
                return 'En attente de validation';
            case 'uploaded':
                return 'Téléchargement...';
            default:
                return 'Non téléchargé';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'loading':
            case 'uploaded':
                return 'text-blue-500';
            case 'validated':
                return 'text-green-600';
            case 'rejected':
                return 'text-red-600';
            case 'en_attente':
                return 'text-orange-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="flex flex-col">
            <label className="block text-[#333333] text-base font-normal mb-1">{label}</label>
            <div
                className="w-full h-12 px-4 rounded-sm border border-[#79747E] text-[#333333] flex items-center justify-between bg-gray-100"
                style={{ fontSize: '1.5rem', fontFamily: 'Roboto, sans-serif' }}
            >
                <span className="truncate">{fileState?.file?.name || getStatusText(null)}</span>
                {fileState?.file && (
                    <span className={`font-semibold ml-2 text-sm ${getStatusColor(fileState.status)}`}>
                        {getStatusText(fileState.status)}
                    </span>
                )}
            </div>
            {fileState?.file && fileState.status === 'en_attente' && (
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={onValidate}
                        className="py-1 px-3 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        Valider
                    </button>
                    <button
                        onClick={onReject}
                        className="py-1 px-3 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        Rejeter
                    </button>
                </div>
            )}
        </div>
    );
};

// Collapsible section component
const CollapsibleSection = ({ title, children, isCollapsed, onToggle }) => {
    const sectionStyle = {
        fontFamily: 'Roboto, sans-serif',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-[#101957] font-semibold text-xl p-2 rounded-md hover:bg-gray-100 transition-colors"
                style={sectionStyle}
            >
                <span>{title}</span>
                <svg
                    className={`h-6 w-6 transform transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isCollapsed ? 'max-h-0' : 'max-h-screen mt-4'}`}>
                <div className="p-2 grid grid-cols-2 gap-x-8 gap-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

const StudentEnrollmentDetails = ({ onBack }) => {
    const { enrollmentId } = useParams();
    const [enrollmentData, setEnrollmentData] = useState(null);

    useEffect(() => {
        // Here you would fetch the enrollment data from your API using enrollmentId
        // For now, we'll use mock data
        const mockEnrollment = {
            id: enrollmentId,
            studentName: 'Mbienda Jean',
            major: 'Génie Logiciel',
            status: 'Soumis',
            documents: {
                diplome1: { file: { name: 'diplome1.pdf' }, status: 'en_attente' },
                diplome2: { file: { name: 'diplome2.pdf' }, status: 'validated' },
                cniRecto: { file: { name: 'cniRecto.jpg' }, status: 'en_attente' },
                cniVerso: { file: { name: 'cniVerso.jpg' }, status: 'en_attente' },
                acteNaissance: { file: { name: 'acteNaissance.pdf' }, status: 'en_attente' },
                photoIdentite: { file: { name: 'photo.jpg' }, status: 'en_attente' },
            },
        };
        setEnrollmentData(mockEnrollment);
    }, [enrollmentId]);

    const handleDocumentAction = (docKey, newStatus) => {
        setEnrollmentData(prevData => ({
            ...prevData,
            documents: {
                ...prevData.documents,
                [docKey]: {
                    ...prevData.documents[docKey],
                    status: newStatus,
                },
            },
        }));
    };

    const [collapsedSections, setCollapsedSections] = useState({
        personalInfo: false,
        documents: false,
        academicHistory: false,
        contactInfo: false,
    });

    const toggleSection = (sectionName) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }));
    };

    if (!enrollmentData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button 
                    onClick={onBack} 
                    className="flex items-center text-[#101957] font-semibold mr-4 p-2 rounded-lg"
                    style={{ backgroundColor: '#E9EDF4' }}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-[#333333] text-3xl font-bold">Détail de l'inscription de "{enrollmentData.studentName}" à "{enrollmentData.major}"</h2>
            </div>

            {/* Status Dropdown */}
            <div className="flex justify-end items-center mb-8">
                <label className="mr-4 text-lg font-semibold text-[#101957]">Statut global :</label>
                <select
                    className="p-2 rounded-md border border-gray-300 bg-white"
                    value={enrollmentData.status}
                    onChange={(e) => setEnrollmentData(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value="Soumis">Soumis</option>
                    <option value="Validé">Validé</option>
                    <option value="Refusé">Refusé</option>
                </select>
            </div>

            {/* Collapsible Sections */}
            <CollapsibleSection
                title="Informations Personnelles"
                isCollapsed={collapsedSections.personalInfo}
                onToggle={() => toggleSection('personalInfo')}
            >
                <DetailField label="Nom" value={enrollmentData.studentName.split(' ')[0]} />
                <DetailField label="Prénom" value={enrollmentData.studentName.split(' ')[1]} />
                <DetailField label="Sexe" value="Masculin" />
                <DetailField label="Date de naissance" value="23/04/2000" />
                <DetailField label="Nationalité" value="Camerounais" />
                <DetailField label="Type de pièce d'identité" value="CNI" />
            </CollapsibleSection>

            <CollapsibleSection
                title="Documents Officiels"
                isCollapsed={collapsedSections.documents}
                onToggle={() => toggleSection('documents')}
            >
                <DocumentDetailField
                    label='Dernier diplôme obtenu "1"'
                    fileState={enrollmentData.documents.diplome1}
                    onValidate={() => handleDocumentAction('diplome1', 'validated')}
                    onReject={() => handleDocumentAction('diplome1', 'rejected')}
                />
                <DocumentDetailField
                    label='Dernier diplôme obtenu "2" (Facultatif)'
                    fileState={enrollmentData.documents.diplome2}
                    onValidate={() => handleDocumentAction('diplome2', 'validated')}
                    onReject={() => handleDocumentAction('diplome2', 'rejected')}
                />
                <DocumentDetailField
                    label='Photocopie CNI Recto'
                    fileState={enrollmentData.documents.cniRecto}
                    onValidate={() => handleDocumentAction('cniRecto', 'validated')}
                    onReject={() => handleDocumentAction('cniRecto', 'rejected')}
                />
                <DocumentDetailField
                    label='Photocopie CNI Verso'
                    fileState={enrollmentData.documents.cniVerso}
                    onValidate={() => handleDocumentAction('cniVerso', 'validated')}
                    onReject={() => handleDocumentAction('cniVerso', 'rejected')}
                />
                <DocumentDetailField
                    label='Acte de naissance'
                    fileState={enrollmentData.documents.acteNaissance}
                    onValidate={() => handleDocumentAction('acteNaissance', 'validated')}
                    onReject={() => handleDocumentAction('acteNaissance', 'rejected')}
                />
                <DocumentDetailField
                    label="Photo d'identité 4+4"
                    fileState={enrollmentData.documents.photoIdentite}
                    onValidate={() => handleDocumentAction('photoIdentite', 'validated')}
                    onReject={() => handleDocumentAction('photoIdentite', 'rejected')}
                />
            </CollapsibleSection>

            <CollapsibleSection
                title="Parcours Académique"
                isCollapsed={collapsedSections.academicHistory}
                onToggle={() => toggleSection('academicHistory')}
            >
                <DetailField label="Dernier établissement fréquenté" value="Lycée de Mokolo" />
                <DetailField label="Spécialisation" value="Mathématiques" />
                <DetailField label="Disponible pour un stage ?" value="Oui" />
                <DetailField label="Début de formation" value="2018" />
                <DetailField label="Fin de formation" value="2022" />
            </CollapsibleSection>

            <CollapsibleSection
                title="Coordonnées Personnelles"
                isCollapsed={collapsedSections.contactInfo}
                onToggle={() => toggleSection('contactInfo')}
            >
                <DetailField label="Email" value="student@example.com" />
                <DetailField label="Numéro de téléphone" value="+237 6 78 90 12 34" />
                <DetailField label="Pays" value="Cameroun" />
                <DetailField label="Région" value="Centre" />
                <DetailField label="Ville" value="Yaoundé" />
                <DetailField label="Adresse" value="Quartier C, Rue 12" />
                <DetailField label="Nom de la personne à contacter en cas d'urgence (1)" value="Contact 1" />
                <DetailField label="Nom de la personne à contacter en cas d'urgence (2)" value="Contact 2" />
                <DetailField label="Téléphone de la personne à contacter (1)" value="+237 6 77 77 77 77" />
                <DetailField label="Téléphone de la personne à contacter (2)" value="+237 6 77 77 77 78" />
                <DetailField label="Lien de parenté (1)" value="Père" />
                <DetailField label="Lien de parenté (2)" value="Mère" />
            </CollapsibleSection>
        </div>
    );
};

export default StudentEnrollmentDetails;