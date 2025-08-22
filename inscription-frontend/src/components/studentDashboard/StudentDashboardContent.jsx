import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getLatestEnrollment } from '../../services/enrollmentService';
import CourseCard from './CourseCard.jsx';
import EnrollmentForm from './EnrollmentForm.jsx';
import StudentDashboardStatus from './StudentDashboardStatus.jsx';

const SearchIcon = '/assets/svg/search-icon.svg';

const StudentDashboardContent = () => {
    const [courses] = useState([
        {
            id: '1',
            title: 'Informatique',
            description: 'Fondamentaux de la programmation, logique informatique.',
            imageUrl: '/assets/images/filiere-informatique.jpg'
        },
        {
            id: '2',
            title: 'Biologie',
            description: 'Analyse et maîtrise de la science de la vie.',
            imageUrl: '/assets/images/filiere-biologie.jpg'
        },
        {
            id: '3',
            title: 'Physique',
            description: 'Compréhension des lois de l\'univers et phénomènes naturels.',
            imageUrl: '/assets/images/filiere-physique.jpg'
        },
        {
            id: '4',
            title: 'Chimie',
            description: 'Exploration de la matière et des réactions chimiques.',
            imageUrl: '/assets/images/filiere-chimie.jpg'
        },
        {
            id: '5',
            title: 'Mathématiques',
            description: 'Développement de la logique et résolution de problèmes.',
            imageUrl: '/assets/images/filiere-mathematiques.jpg'
        },
        {
            id: '6',
            title: 'Art & Design',
            description: 'Créativité visuelle et principes du design graphique.',
            imageUrl: '/assets/images/filiere-art-et-design.jpg'
        },
        {
            id: '7',
            title: 'Histoire',
            description: 'Exploration de la matière et des réactions chimiques.',
            imageUrl: '/assets/images/filiere-histoire.jpg'
        },
        {
            id: '8',
            title: 'Anglais',
            description: 'Développement de la logique et résolution de problèmes.',
            imageUrl: '/assets/images/filiere-anglais.jpg'
        },
        {
            id: '9',
            title: 'Géologie',
            description: 'Etude de la structure et de l\'évolution de l\'écorce terrestre.',
            imageUrl: '/assets/images/filiere-geologie.jpg'
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [displayMode, setDisplayMode] = useState('courses');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [latestEnrollment, setLatestEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchLatestEnrollment = async () => {
            if (isAuthenticated) {
                try {
                    const enrollment = await getLatestEnrollment();
                    setLatestEnrollment(enrollment);
                } catch (error) {
                    console.error("Failed to fetch latest enrollment:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchLatestEnrollment();
    }, [isAuthenticated]);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setDisplayMode('enrollment');
    };

    const handleGoBackToCourses = () => {
        setSelectedCourse(null);
        setDisplayMode('courses');
    };

    const handleViewStatus = () => {
        setDisplayMode('status');
    };
    
    // Determine the content to display based on enrollment status
    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-gray-500">Chargement...</div>;
        }

        if (latestEnrollment && latestEnrollment.status !== 'IN_PROGRESS' && latestEnrollment.status !== 'PAID') {
            return (
                <StudentDashboardStatus
                    enrollment={latestEnrollment}
                    onGoBack={handleGoBackToCourses}
                />
            );
        }

        if (displayMode === 'enrollment') {
            return (
                <EnrollmentForm course={selectedCourse} onGoBack={handleGoBackToCourses} />
            );
        }

        return (
            <>
                <div
                    className="flex items-center justify-between mb-8"
                    style={{ height: '2rem' }}
                >
                    <h2
                        className="font-medium text-[#333333]"
                        style={{
                            fontSize: '2rem',
                            lineHeight: '143%',
                            letterSpacing: '0.0156rem',
                            fontFamily: 'Roboto, sans-serif',
                        }}
                    >
                        Filières
                    </h2>
                    <div
                        className="relative"
                        style={{
                            width: '21.88rem',
                            height: '2rem',
                            borderRadius: '0.38rem',
                            border: '0.5px solid #999999',
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Rechercher"
                            className="w-full h-full pl-[2.5rem] pr-[1.25rem] py-[0.25rem] rounded-[0.38rem] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] focus:border-transparent bg-transparent text-[#333333]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none' }}
                        />
                        <img
                            src={SearchIcon}
                            alt="Rechercher"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                    </div>
                </div>

                <div
                    className="bg-gray-800 mb-[1.88rem]"
                    style={{
                        height: '0.31rem',
                        borderRadius: '0.5rem',
                    }}
                ></div>

                <div
                    className="grid grid-cols-3"
                    style={{
                        borderRadius: '0.63rem',
                        padding: '1.75rem',
                        rowGap: '1.5rem',
                        columnGap: '1.5rem',
                        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} onEnrollClick={handleEnrollClick} />
                    ))}
                    {filteredCourses.length === 0 && (
                        <p className="col-span-full text-center text-gray-600">Aucun cours trouvé.</p>
                    )}
                </div>
            </>
        );
    };

    return (
        <div
            className="flex flex-col flex-grow bg-white"
            style={{
                paddingTop: '1.88rem',
                paddingRight: '2rem',
                paddingBottom: '1.88rem',
                paddingLeft: '2rem',
                borderTopLeftRadius: '1.25rem',
                borderBottomLeftRadius: '1.25rem',
            }}
        >
            {renderContent()}
        </div>
    );
};

export default StudentDashboardContent;