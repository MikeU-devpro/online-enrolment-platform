import React from 'react';
import Button from './Button';

const CourseCard = ({ image, title, description, icon }) => {
  return (
    <div
      className="bg-white shadow-lg overflow-hidden flex flex-col"
      style={{
        width: '376px',         
        height: '505.78px',     
        borderRadius: '20px',   
        paddingTop: '28px',    
        paddingRight: '38px',
        paddingBottom: '28px',
        paddingLeft: '38px',
      }}
    >

      {image && (
        <div
          className="w-full overflow-hidden"
          style={{
            height: '298.78px',      
            borderRadius: '20px 20px 0 0', 
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}


      <div className="flex flex-col flex-grow mt-4">

        <h3 className="text-xl font-bold text-[#2A3B7C] mb-2">{title}</h3>

        <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>

        <div className="mt-auto">
          <Button tertiary size="md">En savoir plus</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;