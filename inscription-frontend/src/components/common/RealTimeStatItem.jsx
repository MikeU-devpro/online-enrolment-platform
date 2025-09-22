import React from 'react';
import RealTimeStatItem from './RealTimeStatItem';

const RealTimeStats = () => {
    return (
        <div 
            className="flex flex-col rounded-[0.75rem] shadow h-full" 
            style={{
                backgroundColor: 'rgba(16, 25, 87, 0.3)', // #1019574D
            }}
        >
            {/* Top section with heading */}
            <div
                className="flex flex-col rounded-t-[0.75rem] px-6 pt-4"
                style={{
                    backgroundColor: '#101957',
                    height: '12.5%',
                }}
            >
                <h4 className="text-[#FFFFFF] font-semibold text-[1.4rem]">Statistiques en Temps Réel</h4>
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
                    <RealTimeStatItem 
                        text="Comptes connectés" 
                        value="18" 
                        hasValue={true} 
                    />
                    <RealTimeStatItem 
                        text="Document de Menzepoh Yves validé" 
                    />
                    <RealTimeStatItem 
                        text="Nouvelle inscription de Kegne Esther" 
                    />
                    <RealTimeStatItem 
                        text="Paiement reçu pour Alex Kim Darsh" 
                    />
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