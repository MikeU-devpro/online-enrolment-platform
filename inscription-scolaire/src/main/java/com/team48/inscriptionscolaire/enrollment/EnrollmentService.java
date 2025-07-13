package com.team48.inscriptionscolaire.enrollment;

import com.team48.inscriptionscolaire.document.DocumentService;
import com.team48.inscriptionscolaire.program.ProgramRepository;
import com.team48.inscriptionscolaire.student.Student;
import com.team48.inscriptionscolaire.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final ProgramRepository programRepository;
    private final UserRepository userRepository;

    private final EnrollmentMapper enrollmentMapper;
    private final DocumentService documentService;


    @Transactional
    public EnrollmentDtoResponse startEnrollment(EnrollmentDtoRequest dto) {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(email).orElseThrow();
        var student = (Student) user;
        var program = programRepository.findById(dto.getProgramId()).orElseThrow();

        // Check if enrollment already exists
        var existingEnrollment = enrollmentRepository.findByStudentIdAndProgramId(student.getId(), program.getId())
                .orElseGet(() -> {
                    var newEnrollment = new Enrollment();
                    newEnrollment.setStudent(student);
                    newEnrollment.setProgram(program);
                    newEnrollment.setStatus(StatusSubmission.IN_PROGRESS);
                    newEnrollment.setCreatedDate(LocalDateTime.now());
                    return enrollmentRepository.save(newEnrollment);
                });

        // Update enrollment based on current step
        switch (dto.getCurrentStep()) {
            case 1:
                updatePersonalInfo(existingEnrollment, dto.getPersonalInfo());
                break;
            case 2:
                updateAcademicInfo(existingEnrollment, dto.getAcademicInfo());
                break;
            case 3:
                handleDocumentUpload(existingEnrollment, dto.getDocuments());
                break;
            case 4:
                completeEnrollment(existingEnrollment);
                break;
            default:
                throw new IllegalArgumentException("Invalid step number");
        }

        return enrollmentMapper.toDto(enrollmentRepository.save(existingEnrollment));
    }

    private void completeEnrollment(Enrollment existingEnrollment) {
        if (existingEnrollment.getStepCompleted() < 3) {
            throw new IllegalStateException("All steps must be completed before submission");
        }

        if (existingEnrollment.getPersonalInfo() == null ||
                existingEnrollment.getAcademicInfo() == null ||
                existingEnrollment.getDocuments() == null ||
                existingEnrollment.getDocuments().isEmpty()) {
            throw new IllegalStateException("All required information must be provided");
        }

        if (existingEnrollment.getDocuments().stream()
                .noneMatch(doc -> doc.getType() != null && doc.getFileData() != null)) {
            throw new IllegalStateException("At least one valid document must be provided");
        }

        existingEnrollment.setStatus(StatusSubmission.PENDING);
        existingEnrollment.setSubmissionDate(LocalDateTime.now());
        existingEnrollment.setStepCompleted(4);

        log.info("Enrollment {} submitted for validation", existingEnrollment.getId());
    }

    private void updatePersonalInfo(Enrollment enrollment, PersonalInfoDto personalInfoDto) {
        enrollment.setPersonalInfo(enrollmentMapper.toPersonalInfoEntity(personalInfoDto));
        enrollment.setStepCompleted(1);
    }

    private void updateAcademicInfo(Enrollment enrollment, AcademicInfoDto academicInfoDto) {
        enrollment.setAcademicInfo(enrollmentMapper.toAcademicInfoEntity(academicInfoDto));
        enrollment.setStepCompleted(2);
    }

    private void handleDocumentUpload(Enrollment enrollment, List<MultipartFile> documents) {
        try {
            for (MultipartFile document : documents) {
                documentService.uploadImage(document);
                // Document references will be associated through DocumentService
            }
            enrollment.setStepCompleted(3);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload documents", e);
        }
    }

    public EnrollmentDtoResponse getEnrollmentById(Integer enrollmentId) {
        return enrollmentRepository.findById(enrollmentId)
                .map(enrollmentMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found with id: " + enrollmentId));
    }

    public List<EnrollmentDtoResponse> getMyEnrollments() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(email).orElseThrow();
        var student = (Student) user;

        return enrollmentRepository.findByStudentId(student.getId())
                .stream()
                .map(enrollmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDtoResponse> getEnrollmentsByProgram(Integer programId) {
        return enrollmentRepository.findByProgramId(programId)
                .stream()
                .map(enrollmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public EnrollmentDtoResponse validateEnrollment(Integer enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found with id: " + enrollmentId));

        if (enrollment.getStatus() != StatusSubmission.PENDING) {
            throw new IllegalStateException("Only pending enrollments can be validated");
        }

        enrollment.setStatus(StatusSubmission.APPROVED);
        enrollment.setValidationDate(LocalDateTime.now());

        return enrollmentMapper.toDto(enrollmentRepository.save(enrollment));
    }
}