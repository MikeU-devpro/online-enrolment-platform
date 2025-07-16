import React from 'react';
import ProgramCard from './ProgramCard';

const ProgramsSection = () => {
  const programs = [
    {
      title: "Histoire",
      description: "Explorez les civilisations passées et comprenez les événements qui ont façonné notre monde.",
      image: "/assets/images/program-history.png",
    },
    {
      title: "Mathématiques",
      description: "Maîtrisez les fondements logiques et analytiques pour résoudre des problèmes complexes.",
      image: "/assets/images/program-math.png",
    },
    {
      title: "Chimie",
      description: "Plongez dans le monde des éléments et des réactions qui composent l'univers.",
      image: "/assets/images/program-chemistry.png",
    },
    {
      title: "Informatique",
      description: "Développez des compétences en programmation, algorithmes et systèmes numériques.",
      image: "/assets/images/program-informatics.png",
    },
    {
      title: "Physique",
      description: "Étudiez les lois fondamentales de l'univers, de la mécanique quantique à la cosmologie.",
      image: "/assets/images/program-physics.png",
    },
    {
      title: "Anglais",
      description: "Améliorez vos compétences linguistiques et communiquez efficacement à l'échelle mondiale.",
      image: "/assets/images/program-english.png",
    },
  ];

  return (
    <section id="programs" className="relative bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-darkgray text-center mb-12">Nos Filières</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              title={program.title}
              description={program.description}
              imageSrc={program.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;