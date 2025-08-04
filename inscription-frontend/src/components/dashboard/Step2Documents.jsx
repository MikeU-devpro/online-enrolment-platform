import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import FileUploadField from '../common/FileUploadField';

const Step2Documents = ({ initialData = {}, onSaveAndNext, onSave, onPrevious }) => {
    const [diplome1, setDiplome1] = useState(initialData.diplome1 || null);
    const [diplome2, setDiplome2] = useState(initialData.diplome2 || null);
    const [cniRecto, setCniRecto] = useState(initialData.cniRecto || { file: null, status: null });
    const [cniVerso, setCniVerso] = useState(initialData.cniVerso || { file: null, status: null });
    const [acteNaissance, setActeNaissance] = useState(initialData.acteNaissance || { file: null, status: null });
    const [photoIdentite, setPhotoIdentite] = useState(initialData.photoIdentite || { file: null, status: null });

    useEffect(() => {
        setDiplome1(initialData.diplome1 || null);
        setDiplome2(initialData.diplome2 || null);
        setCniRecto(initialData.cniRecto || { file: null, status: null });
        setCniVerso(initialData.cniVerso || { file: null, status: null });
        setActeNaissance(initialData.acteNaissance || { file: null, status: null });
        setPhotoIdentite(initialData.photoIdentite || { file: null, status: null });
    }, [initialData]);

    const handleFileUpload = (setter) => (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setter({ file: file, status: 'loading' });

        setTimeout(() => {
            const newStatus = Math.random() > 0.7 ? 'rejected' : 'validated';
            setter({ file: file, status: newStatus });
        }, 1500);
    };

    const handleFileDelete = (setter) => () => {
        setter({ file: null, status: null });
    };

    const collectData = () => {
        return {
            diplome1,
            diplome2,
            cniRecto,
            cniVerso,
            acteNaissance,
            photoIdentite,
        };
    };

    const handleSaveClick = () => {
        onSave(collectData());
    };

    const handleNextClick = () => {
        onSaveAndNext(collectData());
    };

    return (
        <>
            <h2
                className="mb-4"
                style={{
                    opacity: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.5625rem',
                    lineHeight: '140%',
                    letterSpacing: '0',
                    textAlign: 'center',
                    color: '#666666',
                }}
            >
                Veuillez télécharger les documents requis
            </h2>
            <div className="grid grid-cols-2 gap-x-[1.28rem] gap-y-[2rem]">
                <FileUploadField
                    id="diplome1"
                    label='Dernier diplôme obtenu "1"'
                    description='Importer un fichier compatible : PDF ou image claire et lisible, max 5Mo'
                    fileState={{ file: diplome1, status: diplome1 ? 'uploaded' : null }}
                    onFileChange={handleFileUpload(setDiplome1)}
                    onDelete={handleFileDelete(setDiplome1)}
                    showActions={false}
                />
                <FileUploadField
                    id="diplome2"
                    label='Dernier diplôme obtenu "2" (Facultatif)'
                    description='Importer un fichier compatible : PDF ou image claire et lisible, max 5Mo'
                    fileState={{ file: diplome2, status: diplome2 ? 'uploaded' : null }}
                    onFileChange={handleFileUpload(setDiplome2)}
                    onDelete={handleFileDelete(setDiplome2)}
                    showActions={false}
                />
                <FileUploadField
                    id="cniRecto"
                    label='Photocopie CNI Recto'
                    description='Importer un fichier compatible : PDF ou image claire et lisible(JPG/PNG)'
                    fileState={cniRecto}
                    onFileChange={handleFileUpload(setCniRecto)}
                    onDelete={handleFileDelete(setCniRecto)}
                />
                <FileUploadField
                    id="cniVerso"
                    label='Photocopie CNI Verso'
                    description='Importer un fichier compatible : PDF ou image claire et lisible(JPG/PNG)'
                    fileState={cniVerso}
                    onFileChange={handleFileUpload(setCniVerso)}
                    onDelete={handleFileDelete(setCniVerso)}
                />
                <FileUploadField
                    id="acteNaissance"
                    label='Acte de naissance'
                    description='Importer un fichier compatible : PDF ou image claire et lisible'
                    fileState={acteNaissance}
                    onFileChange={handleFileUpload(setActeNaissance)}
                    onDelete={handleFileDelete(setActeNaissance)}
                />
                <FileUploadField
                    id="photoIdentite"
                    label="Photo d'identité 4+4"
                    description='Importer un fichier compatible : PDF ou image claire et lisible'
                    fileState={photoIdentite}
                    onFileChange={handleFileUpload(setPhotoIdentite)}
                    onDelete={handleFileDelete(setPhotoIdentite)}
                />
            </div>

            <div className="flex justify-between gap-4 mt-8">
                <Button
                    secondary
                    type="button"
                    onClick={onPrevious}
                    className="flex-1 !w-auto font-semibold text-[1.28rem] leading-[127.5%] tracking-[0.0298rem]"
                    style={{ fontFamily: 'Roboto, sans-serif', height: '2.98rem' }}
                >
                    Précédent
                </Button>
                <Button
                    primary
                    type="button"
                    onClick={handleNextClick}
                    className="flex-1 !w-auto font-semibold text-[1.28rem] leading-[127.5%] tracking-[0.0298rem]"
                    style={{ fontFamily: 'Roboto, sans-serif', height: '2.98rem' }}
                >
                    Suivant
                </Button>
            </div>
        </>
    );
};

export default Step2Documents;