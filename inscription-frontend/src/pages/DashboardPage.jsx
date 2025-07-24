import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Contenu du Tableau de Bord</h1>
      <p className="text-gray-600">Bienvenue sur votre tableau de bord étudiant. Ici, vous verrez vos cours, messages, et plus.</p>
    </DashboardLayout>
  );
};

export default DashboardPage;