package com.team48.inscriptionscolaire.enrollment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    Optional<Enrollment> findByStudentIdAndProgramId(Integer studentId, Integer programId);
    Optional<Enrollment> findById(Integer id);
    List<Enrollment> findByStudentId(Integer studentId);
    List<Enrollment> findByProgramId(Integer programId);

    List<Enrollment> findByAcademicYear(String academicYear);
    List<Enrollment> findByProgramIdAndAcademicYear(Integer programId, String academicYear);

    Optional<Enrollment> findByStudentIdAndProgramIdAndAcademicYear(
            Integer studentId,
            Integer programId,
            String academicYear
    );
}
