import React from 'react';

const StatsCard = ({ title, value, color }) => {
    return (
        <div className={`p-6 rounded-[0.53rem] shadow flex flex-col justify-between items-start text-white ${color}`} style={{ fontFamily: 'Roboto, sans-serif' }}>
            <h3 className="text-[1.5rem] font-medium mb-4">{title}</h3>
            <span className="text-[3rem] font-bold">{value}</span>
        </div>
    );
};

export default StatsCard;