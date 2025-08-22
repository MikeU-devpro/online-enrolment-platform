import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import Step1PersonalInfo from './Step1PersonalInfo.jsx';
import Step2Documents from './Step2Documents.jsx';
import Step3AcademicInfo from './Step3AcademicInfo.jsx';
import Step4ContactInfo from './Step4ContactInfo.jsx';
import Step5Summary from './Step5Summary.jsx';
import { submitEnrollmentForm } from '../../services/enrollmentService';

const BackArrowIcon = '/assets/svg/back-arrow-icon.svg';

const EnrollmentForm = ({ course, onGoBack }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        step1: {},
        step2: {},
        step3: {},
        step4: {},
    });

    const totalSteps = 5;

    const handleSaveStepData = (stepName, data) => {
        setFormData(prevData => ({
            ...prevData,
            [stepName]: data,
        }));
        console.log(`Data for ${stepName} updated:`, data);
    };

    const handleSave = (stepName, data) => {
        handleSaveStepData(stepName, data);
        alert(`Données de l'étape ${stepName} sauvegardées!`);
    };

    const handleNext = (stepName, data) => {
        handleSaveStepData(stepName, data);
        if (step < totalSteps) {
            setStep(prevStep => prevStep + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    };
    
    // This is the updated function to send data to the backend
    const handleFinish = async () => {
        const finalData = {
            // Combine data from all steps into a single object
            ...formData.step1,
            ...formData.step2,
            ...formData.step3,
            ...formData.step4,
            courseId: course.id, // Include the course ID with the submission
        };
        
        console.log('Final Form Data for submission:', finalData);

        try {
            // Call the API service to submit the data
            const response = await submitEnrollmentForm(finalData);

            // Handle a successful response from the backend
            if (response.status === 201) { 
                alert('Formulaire d’inscription soumis avec succès!');
                console.log('Submission successful:', response.data);
                // You could add logic here to redirect the user or show a success message
            }
        } catch (error) {
            // Handle any errors that occurred during the API call
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 400) {
                alert('Erreur de validation: Veuillez vérifier les données du formulaire.');
            } else {
                alert('Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.');
            }
        }
    };

    let innerBoxWidth;
    switch (step) {
        case 3:
            innerBoxWidth = '52%';
            break;
        case 4:
        case 5:
            innerBoxWidth = '93%';
            break;
        case 2:
            innerBoxWidth = '74.7rem';
            break;
        default:
            innerBoxWidth = '59.4rem';
            break;
    }

    if (!course) {
        return (
            <div className="text-center p-8 text-gray-700">
                Aucun cours sélectionné. Veuillez sélectionner un cours pour démarrer l'inscription.
                <button type="button" onClick={onGoBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Retour aux cours</button>
            </div>
        );
    }

    // Combine data from all steps for the summary page
    const combinedFormData = {
        ...formData.step1,
        ...formData.step2,
        ...formData.step3,
        ...formData.step4,
    };

    return (
        <div // Outer Bigger Box
            className="flex flex-col mx-auto"
            style={{
                width: '1440px',
                height: 'auto',
                borderRadius: '0.39rem',
                paddingTop: '1.11rem',
                paddingRight: '1.11rem',
                paddingLeft: '1.11rem',
                paddingBottom: '0.66rem',
                gap: '1.03rem',
                background: 'rgba(239, 239, 239, 0.2)',
                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Course title/description and back arrow */}
            <div className="flex items-center" style={{ width: '100%' }}>
                <button type="button" onClick={onGoBack} className="flex items-center text-[#333333] hover:text-[#6B4F8B] mr-4">
                    {BackArrowIcon && <img src={BackArrowIcon} alt="Retour" className="mr-2" style={{ width: '1.7rem', height: '1.7rem' }} />}
                </button>
                <h1
                    className="font-bold text-[#333333] flex-grow"
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '1.75rem',
                        lineHeight: '143%',
                        letterSpacing: '0.02rem',
                    }}
                >
                    {course.title}: {course.description}
                </h1>
            </div>

            {/* Conditional header section (h3, progress stepper) */}
            {(step >= 1 && step <= totalSteps) && (
                <div style={{ width: '100%', marginTop: '1.5rem' }}>
                    <h3
                        className="font-bold"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 500,
                            fontSize: '1.38rem',
                            lineHeight: '100%',
                            letterSpacing: '0.02rem',
                            marginLeft: '0.16rem',
                            display: 'inline-block',
                            color: '#101957',
                        }}
                    >
                        {step === 1 && "Informations Personnelles"}
                        {step === 2 && "Documents Officiels"}
                        {step === 3 && "Parcours Académique"}
                        {step === 4 && "Coordonnées Personnelles"}
                        {step === 5 && "Confirmation & Récapitulatif"}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div
                                key={index}
                                className="flex-1 rounded-full"
                                style={{
                                    height: '0.32rem',
                                    margin: '0 0.16rem',
                                    background: index < step ? '#101957' : '#E0E0E0',
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            )}

            <div // Inner Form Box - width now conditional based on step
                style={{
                    width: innerBoxWidth,
                    height: 'auto',
                    borderRadius: '0.53rem',
                    paddingTop: '0.85rem',
                    paddingRight: '1.28rem',
                    paddingBottom: '0.85rem',
                    paddingLeft: '1.28rem',
                    background: 'rgba(242, 242, 242, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                }}
            >
                {/* Render the current step component based on 'step' state */}
                {step === 1 && (
                    <Step1PersonalInfo
                        initialData={formData.step1}
                        onSave={(data) => handleSave('step1', data)}
                        onSaveAndNext={(data) => handleNext('step1', data)}
                    />
                )}
                {step === 2 && (
                    <Step2Documents
                        initialData={formData.step2}
                        onSave={(data) => handleSave('step2', data)}
                        onSaveAndNext={(data) => handleNext('step2', data)}
                        onPrevious={handlePrevious}
                    />
                )}
                {step === 3 && (
                    <Step3AcademicInfo
                        initialData={formData.step3}
                        onSave={(data) => handleSave('step3', data)}
                        onSaveAndNext={(data) => handleNext('step3', data)}
                        onPrevious={handlePrevious}
                    />
                )}
                {step === 4 && (
                    <Step4ContactInfo
                        initialData={formData.step4}
                        onSave={(data) => handleSave('step4', data)}
                        onSaveAndNext={(data) => handleNext('step4', data)}
                        onPrevious={handlePrevious}
                    />
                )}
                {step === 5 && (
                    <Step5Summary
                        formData={combinedFormData}
                        onPrevious={handlePrevious}
                        onFinish={handleFinish}
                    />
                )}
            </div>
        </div>
    );
};

export default EnrollmentForm;