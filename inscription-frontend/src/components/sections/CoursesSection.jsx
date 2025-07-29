import React from 'react';
import CourseCard from '../common/CourseCard';
import hangingTags from '/assets/svg/hanging-tags.svg';

const coursesData = [
  {
    id: 1,
    image: '/assets/images/histoire.png',
    title: 'Histoire',
    description: "L'histoire est abordée de manière dynamique et engageante, au-delà de mémoriser des dates.",
  },
  {
    id: 2,
    image: '/assets/images/mathematique.png',
    title: 'Mathématiques',
    description: "Le programme met l'accent sur la logique, la résolution de problèmes et l'analyse critique.",
  },
  {
    id: 3,
    image: '/assets/images/chimie.png',
    title: 'Chimie',
    description: 'La chimie est enseignée de manière interactive et expérimentale.',
  },
  {
    id: 4,
    image: '/assets/images/informatique.png',
    title: 'Informatique',
    description: 'L\'informatique est enseignée de manière pratique et tournée vers l\'avenir.',
  },
  {
    id: 5,
    image: '/assets/images/physique.png',
    title: 'Physique',
    description: 'La physique est explorée de manière interactive, en reliant les concepts théoriques.',
  },
  {
    id: 6,
    image: '/assets/images/anglais.png',
    title: 'Anglais',
    description: 'L\'anglais est enseigné de manière immersive, pour que les étudiants maîtrisent aussi la culture.',
  },
];

const CoursesSection = () => {
  const filteredCourses = coursesData;

  return (
    <section
      className="relative mt-[-20] pt-36 md:pt-44 pb-16 md:pb-24 bg-white mb-[3rem] overflow-visible"
    >
      <img
        src={hangingTags}
        alt="Decorative Hanging Tags"
        className="
          absolute
          top-[-14rem]
          right-[12rem]
          w-[289px]
          h-[500px]
          z-[100]
        "
      />

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