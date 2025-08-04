import React from 'react';
import Button from './Button'; // Assuming Button.jsx is in the same common folder

// Make sure these paths are correct relative to where the final EnrollmentForm.jsx is used,
// but for this component, it assumes relative path from its usage point.
// If icons are absolute from root, they would be just '/assets/svg/upload-icon.svg'
const UploadIcon = '/assets/svg/upload-icon.svg';

const FileUploadField = ({
    id,
    label,
    description,
    fileState, // This object should contain { file: File | null, status: string | null }
    onFileChange, // Callback when a new file is selected (receives event)
    onDelete,     // Callback when delete is clicked (receives id)
    showActions = true // Whether to show Modifier/Supprimer buttons (defaults to true)
}) => {
    const handleFileButtonClick = () => {
        // Trigger click on the hidden file input
        document.getElementById(id).click();
    };

    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="block mb-[0.575rem]"
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.2375rem',
                    lineHeight: '140%',
                    letterSpacing: '0',
                    color: '#333333',
                }}
            >
                {label}
            </label>
            <p
                className="mb-[0.8625rem]"
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.9625rem',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    color: '#6b7280',
                }}
            >
                {description}
            </p>
            <input
                type="file"
                id={id}
                className="hidden"
                onChange={onFileChange}
            />
            {!fileState?.file ? (
                <button
                    type="button"
                    onClick={handleFileButtonClick}
                    style={{
                        width: '300px',
                        height: '55px',
                        borderRadius: '7px',
                        padding: '17px 23px',
                        border: '1px solid #0000002B',
                        backgroundColor: 'rgba(242, 242, 242, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                    }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                >
                    <img src={UploadIcon} alt="Upload" className="mr-2" style={{ width: '1.375rem', height: '1.375rem' }} />
                    <span
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            fontSize: '1.2375rem',
                            lineHeight: '140%',
                            letterSpacing: '0',
                            color: '#101957',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Ajouter un fichier
                    </span>
                </button>
            ) : (
                <div
                    className="flex items-center justify-between border"
                    style={{
                        width: '300px',
                        height: '55px',
                        borderRadius: '7px',
                        paddingLeft: '23px',
                        paddingRight: '23px',
                        borderColor: '#0000002B',
                        backgroundColor: 'rgba(242, 242, 242, 0.6)',
                    }}
                >
                    <span className="truncate mr-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2375rem', fontWeight: 500 }}>{fileState.file.name}</span>
                    <span className={`font-semibold
                        ${fileState.status === 'loading' ? 'text-blue-600' : ''}
                        ${fileState.status === 'pending' ? 'text-yellow-600' : ''}
                        ${fileState.status === 'rejected' ? 'text-red-600' : ''}
                        ${fileState.status === 'validated' ? 'text-green-600' : ''}
                    `}
                    style={{ fontSize: '0.99rem' }}
                    >
                        {fileState.status === 'loading' && 'Téléchargement...'}
                        {fileState.status === 'pending' && 'En attente de validation'}
                        {fileState.status === 'rejected' && 'Rejeté'}
                        {fileState.status === 'validated' && 'Validé'}
                    </span>
                </div>
            )}
            {showActions && fileState?.file && (fileState.status === 'rejected' || fileState.status === 'validated') && (
                <div className="flex mt-[0.7rem] justify-end" style={{ gap: '0.7rem' }}>
                    <Button
                        secondary
                        size="sm"
                        type="button"
                        onClick={handleFileButtonClick} // Re-use the button click to trigger file input
                        className="!w-auto !h-auto font-semibold"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '0.99rem',
                            padding: '0.35rem 0.9rem',
                        }}
                    >
                        Modifier
                    </Button>
                    <button
                        type="button"
                        onClick={() => onDelete(id)} // Pass id to onDelete
                        className="text-red-600 font-semibold hover:underline"
                        style={{
                            fontSize: '0.99rem',
                            padding: '0.35rem 0.9rem',
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploadField;