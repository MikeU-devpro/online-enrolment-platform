import React from 'react';

const StudentFAQ = () => {
    const faqItems = [
        {
            question: "Comment puis-je m'inscrire à une filière ?",
            answer: "Sur votre tableau de bord, cliquez sur la filière de votre choix et remplissez le formulaire d'inscription. Vous serez contacté par l'administration pour finaliser le processus."
        },
        {
            question: "Quels sont les documents requis pour l'inscription ?",
            answer: "Généralement, vous aurez besoin de votre relevé de notes du secondaire, d'une pièce d'identité valide, et d'une photo d'identité récente. Des documents supplémentaires peuvent être demandés en fonction de la filière choisie."
        },
        {
            question: "Comment puis-je vérifier le statut de mon inscription ?",
            answer: "Le statut de votre inscription sera mis à jour dans la section 'Inscriptions' de votre tableau de bord. Vous recevrez également des notifications par e-mail à chaque étape du processus."
        },
        {
            question: "Que faire si j'ai oublié mon mot de passe ?",
            answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié'. Suivez les instructions pour réinitialiser votre mot de passe à l'aide de l'adresse e-mail associée à votre compte."
        },
        {
            question: "Comment puis-je contacter l'administration ?",
            answer: "Vous pouvez nous contacter via la section 'Messagerie' de votre tableau de bord ou en utilisant le bouton 'Aide' pour un support instantané."
        }
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Foire Aux Questions (FAQ) - Espace Étudiant</h2>
            <div className="space-y-6">
                {faqItems.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentFAQ;