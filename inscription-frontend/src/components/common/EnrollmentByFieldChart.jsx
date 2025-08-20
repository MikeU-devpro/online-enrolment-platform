import React from 'react';

const EnrollmentByFieldChart = () => {
    return (
        <div className="bg-[#FFFFFF] rounded-[0.53rem] shadow h-full flex flex-col">
            <div
                className="p-4 rounded-t-[0.53rem]"
                style={{ backgroundColor: '#1019574D' }}
            >
                <h4 className="text-[#101957] font-semibold text-[1.5rem]">Inscription par Filière</h4>
            </div>
            {/* Chart placeholder section */}
            <div className="p-6 flex-grow flex items-center justify-center text-gray-400 border border-dashed rounded-b-lg">
                Graphique d'inscription par filière (à implémenter)
            </div>
        </div>
    );
};

export default EnrollmentByFieldChart;