import React from 'react';

const EnrollmentDensityChart = () => {
    const data = [
        { filiere: 'Informatique', percentage: 21 },
        { filiere: 'Informatique II', percentage: 50 },
        { filiere: 'Informatique II', percentage: 50 },
        { filiere: 'Mathématiques', percentage: 80 },
        { filiere: 'Physique', percentage: 20 },
        { filiere: 'Biologie', percentage: 35 },
        { filiere: 'Science de l’ADN', percentage: 75 },
        { filiere: 'Chimie', percentage: 10 },
    ];

    return (
        <div className="bg-[#FFFFFF] rounded-[0.53rem] shadow h-full flex flex-col">
            <div
                className="p-4 rounded-t-[0.53rem]"
                style={{ backgroundColor: '#1019574D' }}
            >
                <h4 className="text-[#101957] font-semibold text-[1.5rem]">Densité des Inscriptions par Filière</h4>
            </div>
            {/* Chart placeholder section */}
            <div className="p-6 flex-grow flex flex-col justify-center text-gray-400">
                <p className="text-[#666666] text-[1rem] mb-4">Visualisation de la répartition des inscriptions par filière</p>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-[#333333] text-[1.2rem]">
                                <span>{item.filiere}</span>
                                <span>{item.percentage}%</span>
                            </div>
                            <div className="w-full bg-[#E0E0E0] h-2 rounded-full mt-1">
                                <div className="bg-[#101957] h-full rounded-full" style={{ width: `${item.percentage}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnrollmentDensityChart;