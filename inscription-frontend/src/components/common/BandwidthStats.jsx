import React from 'react';

const BandwidthStats = () => {
    return (
        <div
            className="flex-grow p-4 rounded-[0.53rem] shadow text-[#101957] flex justify-around items-center"
            style={{
                backgroundColor: '#B6B8CB',
            }}
        >
            <div className="flex items-center gap-2">
                <img src="/assets/images/up-down-arrows.png" alt="Up-down arrows" className="w-6 h-6" />
                <span className="text-[1.2rem] font-medium">Bande pass : 500Mo</span>
            </div>
            <div className="flex items-center gap-2">
                <img src="/assets/images/load.png" alt="Load icon" className="w-6 h-6" />
                <span className="text-[1.2rem] font-medium">Poids total : 5.2Go</span>
            </div>
        </div>
    );
};

export default BandwidthStats;