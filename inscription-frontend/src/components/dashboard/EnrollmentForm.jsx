import React, { useState } from 'react';
import Button from '../common/Button';

const BackArrowIcon = '/assets/svg/back-arrow-icon.svg';

const EnrollmentForm = ({ course, onGoBack }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [nationalite, setNationalite] = useState('Camerounais');
    const [typePieceIdentite, setTypePieceIdentite] = useState('CNI');

    const [diplome1, setDiplome1] = useState(null);
    const [diplome2, setDiplome2] = useState(null);
    const [cniRecto, setCniRecto] = useState({ file: null, status: null });
    const [cniVerso, setCniVerso] = useState({ file: null, status: 'pending' });
    const [acteNaissance, setActeNaissance] = useState({ file: null, status: 'rejected' });
    const [photoIdentite, setPhotoIdentite] = useState({ file: null, status: 'validated' });

    const [step, setStep] = useState(1);

    const totalSteps = 5;

    const centralAfricanNationalities = [
        'Camerounais',
        'Centrafricain',
        'Tchadien',
        'Congolais (RDC)',
        'Congolais (République)',
        'Guinéen équatorial',
        'Gabonais',
        'Santoméen',
        'Autre',
    ];

    const handleSave = () => {
        if (step === 1) {
            console.log('Saving form data (Step 1):', {
                nom, prenom, sexe, dateNaissance, nationalite, typePieceIdentite
            });
        } else if (step === 2) {
            console.log('Saving form data (Step 2):', {
                diplome1, diplome2, cniRecto, cniVerso, acteNaissance, photoIdentite
            });
        }
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(prevStep => prevStep + 1);
        } else {
            console.log('Form submission complete!');
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    };

    const handleFileUpload = (setter, event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (setter === setDiplome1) setDiplome1(file);
        else if (setter === setDiplome2) setDiplome2(file);
        else if (setter === setCniRecto) setCniRecto({ file: file, status: 'loading' });
        else if (setter === setCniVerso) setCniVerso({ file: file, status: 'loading' });
        else if (setter === setActeNaissance) setActeNaissance({ file: file, status: 'loading' });
        else if (setter === setPhotoIdentite) setPhotoIdentite({ file: file, status: 'loading' });
    };

    const renderFileUploadField = (id, label, description, state, setter, showActions = true) => (
        <div className="flex flex-col">
            <label htmlFor={id} className="block text-[#333333] text-sm font-medium mb-1">{label}</label>
            <p className="text-xs text-gray-500 mb-2">{description}</p>
            <input
                type="file"
                id={id}
                className="hidden"
                onChange={(e) => handleFileUpload(setter, e)}
            />
            {!state?.file ? (
                <button
                    type="button"
                    onClick={() => document.getElementById(id).click()}
                    className="flex items-center justify-center px-4 py-2 border border-[#999999] rounded-md bg-white text-[#333333] hover:bg-gray-50 transition-colors duration-200"
                >
                    <span className="mr-2 text-lg">&#x2191;</span> Ajouter un fichier
                </button>
            ) : (
                <div className="flex items-center justify-between py-2 px-4 rounded-md bg-white border border-[#999999]">
                    <span className="truncate mr-2">{state.file.name}</span>
                    <span className={`text-sm font-semibold
                        ${state.status === 'loading' ? 'text-blue-600' : ''}
                        ${state.status === 'pending' ? 'text-yellow-600' : ''}
                        ${state.status === 'rejected' ? 'text-red-600' : ''}
                        ${state.status === 'validated' ? 'text-green-600' : ''}
                    `}>
                        {state.status === 'loading' && 'Téléchargement...'}
                        {state.status === 'pending' && 'En attente de validation'}
                        {state.status === 'rejected' && 'Rejeté'}
                        {state.status === 'validated' && 'Validé'}
                    </span>
                </div>
            )}
            {showActions && state?.file && (state.status === 'rejected' || state.status === 'validated') && (
                <div className="flex space-x-2 mt-2 justify-end">
                    <Button
                        secondary
                        size="sm"
                        type="button"
                        onClick={() => document.getElementById(id).click()}
                        className="!w-auto !h-auto text-sm px-3 py-1"
                    >
                        Modifier
                    </Button>
                    <button
                        type="button"
                        onClick={() => setter({ file: null, status: null })}
                        className="text-red-600 text-sm font-semibold px-3 py-1 hover:underline"
                    >
                        Supprimer
                    </button>
                </div>
            )}
        </div>
    );

    if (!course) {
        return (
            <div className="text-center p-8 text-gray-700">
                Aucun cours sélectionné. Veuillez sélectionner un cours pour démarrer l'inscription.
                <button type="button" onClick={onGoBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Retour aux cours</button>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col mx-auto"
            style={{
                width: '83%',
                background: '#F2F2F299',
                borderRadius: '1.25rem',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                padding: '2rem',
                flexGrow: 1,
            }}
        >
            <div className="flex items-center mb-6">
                <button type="button" onClick={onGoBack} className="flex items-center text-[#333333] hover:text-[#6B4F8B] mr-4">
                    {BackArrowIcon && <img src={BackArrowIcon} alt="Retour" className="w-6 h-6 mr-2" />}
                </button>
                <h1
                    className="font-medium text-[#333333] flex-grow"
                    style={{
                        fontSize: '1.5rem',
                        lineHeight: '143%',
                        letterSpacing: '0.0156rem',
                        fontFamily: 'Roboto, sans-serif',
                    }}
                >
                    {course.title}: {course.description}
                </h1>
            </div>

            <div className="mb-8">
                <h3
                    className="font-bold text-[#333333]"
                    style={{
                        fontSize: '1.25rem',
                        lineHeight: '143%',
                        letterSpacing: '0.0156rem',
                        fontFamily: 'Roboto, sans-serif',
                        marginLeft: '0.25rem',
                        borderBottom: step === 2 ? '2px solid #6B4F8B' : 'none',
                        paddingBottom: step === 2 ? '0.5rem' : '0',
                        display: 'inline-block',
                    }}
                >
                    {step === 1 && <>Informations<br/>Personnelles</>}
                    {step === 2 && 'Documents Officiels'}
                </h3>
                <div className="flex justify-between items-center mt-2">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <div
                            key={index}
                            className="flex-1 h-1 mx-1 rounded-full"
                            style={{
                                background: index < step ? '#6B4F8B' : '#E0E0E0',
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <form className="flex-grow flex flex-col justify-between">
                {step === 1 && (
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="nom" className="block text-[#333333] text-sm font-medium mb-1">Nom</label>
                            <input
                                type="text"
                                id="nom"
                                className="w-full px-4 py-2 border border-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                                placeholder="Entrez votre nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="prenom" className="block text-[#333333] text-sm font-medium mb-1">Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                className="w-full px-4 py-2 border border-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                                placeholder="Entrez votre prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-[#333333] text-sm font-medium">Sexe :</label>
                            <div className="flex space-x-6 items-center">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-[#6B4F8B]"
                                        name="sexe"
                                        value="Féminin"
                                        checked={sexe === 'Féminin'}
                                        onChange={(e) => setSexe(e.target.value)}
                                    />
                                    <span className="ml-2 text-[#333333]">Féminin</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-[#6B4F8B]"
                                        name="sexe"
                                        value="Masculin"
                                        checked={sexe === 'Masculin'}
                                        onChange={(e) => setSexe(e.target.value)}
                                    />
                                    <span className="ml-2 text-[#333333]">Masculin</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-[#6B4F8B]"
                                        name="sexe"
                                        value="Non-binaire"
                                        checked={sexe === 'Non-binaire'}
                                        onChange={(e) => setSexe(e.target.value)}
                                    />
                                    <span className="ml-2 text-[#333333]">Non-binaire</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="dateNaissance" className="block text-[#333333] text-sm font-medium mb-1">Date de naissance</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="dateNaissance"
                                    className="w-full px-4 py-2 border border-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                                    value={dateNaissance}
                                    onChange={(e) => setDateNaissance(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nationalite" className="block text-[#333333] text-sm font-medium mb-1">Nationalité</label>
                            <select
                                id="nationalite"
                                className="w-full px-4 py-2 border border-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333] bg-white appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B4F8B' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 10.586l-3.586-3.586L5 8.293z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5rem' }}
                                value={nationalite}
                                onChange={(e) => setNationalite(e.target.value)}
                            >
                                {centralAfricanNationalities.map(nat => (
                                    <option key={nat} value={nat}>{nat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="typePieceIdentite" className="block text-[#333333] text-sm font-medium mb-1">Type de pièce d'identité</label>
                            <select
                                id="typePieceIdentite"
                                className="w-full px-4 py-2 border border-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333] bg-white appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B4F8B' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 10.586l-3.586-3.586L5 8.293z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5rem' }}
                                value={typePieceIdentite}
                                onChange={(e) => setTypePieceIdentite(e.target.value)}
                            >
                                <option value="CNI">CNI</option>
                                <option value="Passport">Passport</option>
                                <option value="Permis de conduire">Permis de conduire</option>
                            </select>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        {renderFileUploadField(
                            'diplome1',
                            'Dernier diplôme obtenu "1"',
                            'Importer un fichier compatible : PDF ou image claire et lisible, max 5Mo',
                            { file: diplome1, status: diplome1 ? 'uploaded' : null },
                            setDiplome1,
                            false
                        )}
                        {renderFileUploadField(
                            'diplome2',
                            'Dernier diplôme obtenu "2" (Facultatif)',
                            'Importer un fichier compatible : PDF ou image claire et lisible, max 5Mo',
                            { file: diplome2, status: diplome2 ? 'uploaded' : null },
                            setDiplome2,
                            false
                        )}
                        {renderFileUploadField(
                            'cniRecto',
                            'Photocopie CNI Recto',
                            'Importer un fichier compatible : PDF ou image claire et lisible(JPG/PNG)',
                            cniRecto,
                            setCniRecto
                        )}
                        {renderFileUploadField(
                            'cniVerso',
                            'Photocopie CNI Verso',
                            'Importer un fichier compatible : PDF ou image claire et lisible(JPG/PNG)',
                            cniVerso,
                            setCniVerso
                        )}
                        {renderFileUploadField(
                            'acteNaissance',
                            'Acte de naissance',
                            'Importer un fichier compatible : PDF ou image claire et lisible',
                            acteNaissance,
                            setActeNaissance
                        )}
                        {renderFileUploadField(
                            'photoIdentite',
                            'Photo d\'identité 4+4',
                            'Importer un fichier compatible : PDF ou image claire et lisible',
                            photoIdentite,
                            setPhotoIdentite
                        )}
                    </div>
                )}

                <div className="flex justify-between gap-4 mt-8">
                    {step === 1 && (
                        <>
                            <Button secondary type="button" onClick={handleSave} className="flex-1 !w-auto !h-auto">
                                Sauvegarder
                            </Button>
                            <Button primary type="button" onClick={handleNext} className="flex-1 !w-auto !h-auto">
                                Suivant
                            </Button>
                        </>
                    )}

                    {step > 1 && (
                        <>
                            <Button secondary type="button" onClick={handlePrevious} className="flex-1 !w-auto !h-auto">
                                Précédent
                            </Button>
                            <Button primary type="button" onClick={handleNext} className="flex-1 !w-auto !h-auto">
                                Suivant
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EnrollmentForm;