import React from 'react';

const CourseCard = ({ course }) => {
    const { title, description, imageUrl, id } = course;

    const handleEnrollment = () => {
        console.log(`Démarrer une inscription pour le cours: ${title} (ID: ${id})`);

    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <div
                className="h-40 bg-cover bg-center flex items-end p-4 text-white"
                style={{ backgroundImage: `url(${imageUrl})` }}
                role="img"
                aria-label={`Image de fond pour le cours ${title}`}
            >

                <h3 className="text-xl font-bold bg-black bg-opacity-40 p-2 rounded-md leading-tight">{title}</h3>
            </div>

            <div className="p-4 flex flex-col justify-between" style={{ minHeight: '120px' }}>
                <p className="text-gray-700 text-sm mb-4">{description}</p>
                <button
                    onClick={handleEnrollment}
                    className="w-full bg-[#6B4F8B] text-white py-2 rounded-md hover:bg-[#5C4278] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] focus:ring-opacity-50"
                >
                    Démarrer une inscription
                </button>
            </div>
        </div>
    );
};

export default CourseCard;