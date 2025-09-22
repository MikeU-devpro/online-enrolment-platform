import React from 'react';

const RealTimeStats = () => {
    return (
        <div 
            className="flex flex-col rounded-[0.75rem] shadow h-full" 
            style={{
                gap: '0.5rem',
            }}
        >
            {/* Top section with heading */}
            <div
                className="flex flex-col rounded-t-[0.75rem] px-6 pt-4"
                style={{
                    backgroundColor: 'rgba(16, 25, 87, 0.3)',
                    height: '12.5%',
                }}
            >
                <h4 className="text-[#101957] font-semibold text-[1.4rem]">Statistiques en Temps Réel</h4>
            </div>

            {/* Main content area with list items */}
            <div 
                className="bg-[#FFFFFF] p-6 flex-grow flex flex-col overflow-y-auto"
                style={{
                    borderRadius: '0.53rem',
                    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                }}
            >
                <ul className="text-[#333333] text-[1.2rem] flex flex-col space-y-2 flex-grow">
                    <li
                        className="p-2 rounded-[0.5rem] flex justify-between items-center"
                        style={{
                            backgroundColor: '#1019571A',
                            padding: '0.5rem',
                            flexGrow: 1, // Allow list item to grow
                        }}
                    >
                        <span className="font-bold text-[1.1rem]" style={{ color: '#666666', letterSpacing: '0.03125rem' }}>Comptes connectés</span>
                        <span className="text-red-500 font-bold text-[1.1rem]">18</span>
                    </li>
                    <li
                        className="p-2 rounded-[0.5rem] flex items-center"
                        style={{
                            backgroundColor: '#1019571A',
                            padding: '0.5rem',
                            flexGrow: 1,
                        }}
                    >
                        <span className="font-bold text-[1.1rem]" style={{ color: '#666666', letterSpacing: '0.03125rem' }}>Document de Menzepoh Yves validé</span>
                    </li>
                    <li
                        className="p-2 rounded-[0.5rem] flex items-center"
                        style={{
                            backgroundColor: '#1019571A',
                            padding: '0.5rem',
                            flexGrow: 1,
                        }}
                    >
                        <span className="font-bold text-[1.1rem]" style={{ color: '#666666', letterSpacing: '0.03125rem' }}>Nouvelle inscription de Kegne Esther</span>
                    </li>
                    <li
                        className="p-2 rounded-[0.5rem] flex items-center"
                        style={{
                            backgroundColor: '#1019571A',
                            padding: '0.5rem',
                            flexGrow: 1,
                        }}
                    >
                        <span className="font-bold text-[1.1rem]" style={{ color: '#666666', letterSpacing: '0.03125rem' }}>Paiement reçu pour Alex Kim Darsh</span>
                    </li>
                </ul>
            </div>
            {/* The bottom background section */}
            <div
                className="flex-none rounded-b-[0.75rem]"
                style={{
                    height: '12.5%',
                    backgroundColor: 'rgba(16, 25, 87, 0.3)',
                }}
            ></div>
        </div>
    );
};

export default RealTimeStats;