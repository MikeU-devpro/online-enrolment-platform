import React from 'react';
import CourseCard from '../common/CourseCard';

const coursesData = [
  {
    id: 1,
    image: '/assets/images/histoire.jpg',
    title: 'Histoire',
    description: "L'histoire est abordée de manière dynamique et engageante, au-delà de mémoriser des dates.",
  },
  {
    id: 2,
    image: '/assets/images/mathematique.jpg',
    title: 'Mathématiques',
    description: "Le programme met l'accent sur la logique, la résolution de problèmes et l'analyse critique.",
  },
  {
    id: 3,
    image: '/assets/images/chimie.jpg',
    title: 'Chimie',
    description: 'La chimie est enseignée de manière interactive et expérimentale.',
  },
  {
    id: 4,
    image: '/assets/images/informatique.jpg',
    title: 'Informatique',
    description: 'L\'informatique est enseignée de manière pratique et tournée vers l\'avenir.',
  },
  {
    id: 5,
    image: '/assets/images/physique.jpg',
    title: 'Physique',
    description: 'La physique est explorée de manière interactive, en reliant les concepts théoriques.',
  },
  {
    id: 6,
    image: '/assets/images/anglais.jpg',
    title: 'Anglais',
    description: 'L\'anglais est enseigné de manière immersive, pour que les étudiants maîtrisent  aussi la culture.',
  },
];

const CoursesSection = () => {
  const filteredCourses = coursesData;

  return (
    <section

      className="relative mt-[-20] pt-36 md:pt-44 pb-16 md:pb-24 bg-gray-50 mb-[3rem]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <h2 className="text-3xl md:text-5xl font-bold text-[#000] text-left mb-12">
          Nos Filières
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;