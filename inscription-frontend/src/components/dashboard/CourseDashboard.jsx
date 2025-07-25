import React, { useState } from 'react';
import CourseCard from './CourseCard';

const SearchIcon = '/assets/svg/search-icon.svg';

const CourseDashboard = () => {
    const [courses, setCourses] = useState([
        {
            id: '1',
            title: 'Informatique',
            description: 'Fondamentaux de la programmation, logique informatique.',
            imageUrl: '/assets/images/course-informatique.jpg'
        },
        {
            id: '2',
            title: 'Biologie',
            description: 'Analyse et maîtrise de la science de la vie.',
            imageUrl: '/assets/images/course-biologie.jpg'
        },
        {
            id: '3',
            title: 'Physique',
            description: 'Compréhension des lois de l\'univers et phénomènes naturels.',
            imageUrl: '/assets/images/course-physique.jpg'
        },
        {
            id: '4',
            title: 'Chimie',
            description: 'Exploration de la matière et des réactions chimiques.',
            imageUrl: '/assets/images/course-chimie.jpg'
        },
        {
            id: '5',
            title: 'Mathématiques',
            description: 'Développement de la logique et résolution de problèmes.',
            imageUrl: '/assets/images/course-mathematiques.jpg'
        },
        {
            id: '6',
            title: 'Art & Design',
            description: 'Créativité visuelle et principes du design graphique.',
            imageUrl: '/assets/images/course-art-design.jpg'
        },

    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Filières</h2>

            <div className="relative mb-8 max-w-lg">
                <input
                    type="text"
                    placeholder="Rechercher"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Rechercher"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
                {filteredCourses.length === 0 && (
                    <p className="col-span-full text-center text-gray-600">Aucun cours trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default CourseDashboard;