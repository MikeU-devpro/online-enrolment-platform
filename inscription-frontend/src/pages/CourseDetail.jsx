import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const programImages = {
  'HIS_101': '/assets/images/histoire.png',
  'MAT_201': '/assets/images/mathematique.png',
  'CHI_102': '/assets/images/chimie.png',
  'INF_302': '/assets/images/informatique.png',
  'PHYS_201': '/assets/images/physique.png',
  'ENG_202': '/assets/images/anglais.png',
};

const CourseDetail = () => {
  const { courseName } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8091/api/v1/programs/code/${courseName}`);
        setCourse(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseName]);

  if (loading) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center py-20">Erreur : Impossible de récupérer les données du cours.</div>;
  }

  if (!course) {
    return <div className="text-center py-20">404 : Cours non trouvé</div>;
  }

  return (
    <div className="container mx-auto p-8 pt-32 bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">{course.programName}</h1>
      <img
        src={programImages[course.programCode]}
        alt={course.programName}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      <p className="text-lg mb-6">{course.description}</p>

      <h2 className="text-3xl font-bold mb-4">Détails du Cours</h2>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li>**Code du programme :** {course.programCode}</li>
        <li>**Frais d'inscription :** ${course.registrationFee}</li>
        <li>**Capacité maximale :** {course.maxCapacity} étudiants</li>
        <li>**Période d'inscription :** du {course.registrationStartDate} au {course.registrationEndDate}</li>
      </ul>

    </div>
  );
};

export default CourseDetail;