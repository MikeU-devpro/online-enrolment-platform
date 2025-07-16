import React from 'react';
import Button from '../common/Button';

const ProgramCard = ({ title, description, imageSrc }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center">

      <div className="relative w-full h-32 mb-6 -mt-6 bg-secondary flex justify-center items-center rounded-t-lg">
        <div className="absolute -top-4 w-24 h-16 bg-secondary rounded-t-full"></div>
        <img
          src={imageSrc}
          alt={`${title} icon`}
          className="w-24 h-24 object-contain z-10"
        />
      </div>

      <h3 className="text-2xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-gray-700 text-sm mb-6 flex-grow">{description}</p>
      <Button variant="outline" className="text-sm px-4 py-2">En Savoir Plus</Button>
    </div>
  );
};

export default ProgramCard;