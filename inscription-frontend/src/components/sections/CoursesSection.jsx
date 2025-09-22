import CourseCard from '../common/CourseCard';

const coursesData = [
  {
    id: 1,
    image: '/assets/images/histoire.png',
    title: 'Histoire',
    description: "Étude des événements passés et de leur impact sur le présent.",
    link: '/courses/HIS_101',
  },
  {
    id: 2,
    image: '/assets/images/mathematique.png',
    title: 'Mathématiques',
    description: "Algèbre, géométrie et analyse mathématique.",
    link: '/courses/MAT_201',
  },
  {
    id: 3,
    image: '/assets/images/chimie.png',
    title: 'Chimie',
    description: 'La chimie est enseignée de manière interactive et expérimentale.',
    link: '/courses/CHI_102',
  },
  {
    id: 4,
    image: '/assets/images/informatique.png',
    title: 'Informatique',
    description: 'L\'informatique est enseignée de manière pratique et tournée vers l\'avenir.',
    link: '/courses/INF_302',
  },
  {
    id: 5,
    image: '/assets/images/physique.png',
    title: 'Physique',
    description: 'La physique est explorée de manière interactive, en reliant les concepts théoriques.',
    link: '/courses/PHYS_201',
  },
  {
    id: 6,
    image: '/assets/images/anglais.png',
    title: 'Anglais',
    description: 'L\'anglais est enseigné de manière immersive, pour que les étudiants maîtrisent aussi la culture.',
    link: '/courses/ENG_202',
  },
];

const CoursesSection = () => {
  return (
    <section
      id="nos-filieres"
      className="relative pt-36 md:pt-44 pb-16 md:pb-24 bg-white mb-[3rem] overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-[#000] text-left mb-12">
          Nos Filières
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <CourseCard
              key={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;