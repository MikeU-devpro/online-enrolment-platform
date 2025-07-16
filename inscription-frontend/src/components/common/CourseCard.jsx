import React from 'react';
import Button from './Button';

const CourseCard = ({ image, title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {/* Course Image */}
      {image && (
        <div className="w-full h-40 md:h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#2A3B7C] mb-2">{title}</h3>
        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>

        <div className="mt-auto">
          <Button primary size="md">En savoir plus</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;