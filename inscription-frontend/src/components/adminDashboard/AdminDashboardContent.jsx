import React from 'react';
import StatsCard from '../common/StatsCard';

const RealTimeStats = () => <div className="bg-[#FFFFFF] p-6 rounded-[0.53rem] shadow">
    <h4 className="text-[#101957] font-semibold text-[1.5rem] mb-4">Statistiques en Temps Réel</h4>
    <p>Composant de statistiques en temps réel...</p>
</div>;
const EnrollmentDensityChart = () => <div className="bg-[#FFFFFF] p-6 rounded-[0.53rem] shadow">
    <h4 className="text-[#101957] font-semibold text-[1.5rem] mb-4">Densité des Inscriptions par Filière</h4>
    <p>Composant du graphique de densité...</p>
</div>;
const EnrollmentStatusChart = () => <div className="bg-[#FFFFFF] p-6 rounded-[0.53rem] shadow">
    <h4 className="text-[#101957] font-semibold text-[1.5rem] mb-4">Statut des Inscriptions</h4>
    <p>Composant du graphique de statut...</p>
</div>;
const StepProgressChart = () => <div className="bg-[#FFFFFF] p-6 rounded-[0.53rem] shadow">
    <h4 className="text-[#101957] font-semibold text-[1.5rem] mb-4">Progression des Étapes</h4>
    <p>Composant du graphique de progression...</p>
</div>;
const PendingDocuments = () => <div className="bg-[#FFFFFF] p-6 rounded-[0.53rem] shadow">
    <h4 className="text-[#101957] font-semibold text-[1.5rem] mb-4">Documents en Attente de Traitement</h4>
    <p>Composant des documents en attente...</p>
</div>;

const AdminDashboardContent = () => {
    return (
        <div className="p-8" style={{ backgroundColor: '#F8F8F8' }}>
            <h2 className="text-[#101957] text-[2.5rem] font-bold mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>Statistiques</h2>

            {/* Top section: Quick Overview, Real-time Stats, and Enrollment Density */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Quick Overview Cards */}
                <div className="col-span-1 grid grid-rows-2 gap-6">
                    <StatsCard title="Inscriptions Totales" value="52" color="bg-[#6B4F8B]" />
                    <StatsCard title="En Attente de Validation" value="08" color="bg-[#6B4F8B]" />
                </div>
                <div className="col-span-1 grid grid-rows-2 gap-6">
                    <StatsCard title="Inscriptions Validées" value="17" color="bg-[#6B4F8B]" />
                    <StatsCard title="Nouveaux Comptes (24h)" value="31" color="bg-[#6B4F8B]" />
                </div>

                {/* Real-time Stats */}
                <div className="col-span-1 flex flex-col gap-6">
                    <RealTimeStats />
                </div>

                {/* Enrollment Density */}
                <div className="col-span-1 flex flex-col gap-6">
                    <EnrollmentDensityChart />
                </div>
            </div>

            {/* Middle section: Charts */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="col-span-1">
                    <EnrollmentStatusChart />
                </div>
                <div className="col-span-1">
                    <StepProgressChart />
                </div>
            </div>

            {/* Bottom section: Pending Documents */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                    <EnrollmentStatusChart />
                </div>
                <div className="col-span-1">
                    <PendingDocuments />
                </div>
            </div>

        </div>
    );
};

export default AdminDashboardContent;