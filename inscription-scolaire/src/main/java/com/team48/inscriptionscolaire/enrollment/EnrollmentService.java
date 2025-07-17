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

        return convertToDto(enrollmentRepository.save(existingEnrollment));
    }

    private void completeEnrollment(Enrollment enrollment) {
        if (enrollment.getStepCompleted() < 3) {
            throw new IllegalStateException("All steps must be completed before submission");
        }

        if (enrollment.getPersonalInfo() == null ||
                enrollment.getAcademicInfo() == null ||
                enrollment.getDocuments() == null ||
                enrollment.getDocuments().isEmpty()) {
            throw new IllegalStateException("All required information must be provided");
        }

        enrollment.setStatus(StatusSubmission.PENDING);
        enrollment.setSubmissionDate(LocalDateTime.now());
        enrollment.setStepCompleted(4);
    }

    private void updatePersonalInfo(Enrollment enrollment, PersonalInfoDto personalInfoDto) {
        PersonalInfo personalInfo = new PersonalInfo();
        personalInfo.setFirstName(personalInfoDto.getFirstName());
        personalInfo.setLastName(personalInfoDto.getLastName());
        //personalInfo.setDateOfBirth(personalInfoDto.getDateOfBirth());
        personalInfo.setAddress(personalInfoDto.getAddress());
        personalInfo.setPhoneNumber(personalInfoDto.getPhoneNumber());
        enrollment.setPersonalInfo(personalInfo);
        enrollment.setStepCompleted(1);
    }

    private void updateAcademicInfo(Enrollment enrollment, AcademicInfoDto academicInfoDto) {
        AcademicInfo academicInfo = new AcademicInfo();
        academicInfo.setPreviousSchool(academicInfoDto.getPreviousSchool());
        academicInfo.setDiploma(academicInfoDto.getDiploma());
        academicInfo.setGraduationYear(academicInfoDto.getGraduationYear());
        enrollment.setAcademicInfo(academicInfo);
        enrollment.setStepCompleted(2);
    }

    private void handleDocumentUpload(Enrollment enrollment, List<MultipartFile> documents) {
        try {
            for (MultipartFile document : documents) {
                documentService.uploadImage(document);
            }
            enrollment.setStepCompleted(3);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload documents", e);
        }
    }

    public EnrollmentDtoResponse getEnrollmentById(Integer enrollmentId) {
        return enrollmentRepository.findById(enrollmentId)
                .map(this::convertToDto)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found with id: " + enrollmentId));
    }

    public List<EnrollmentDtoResponse> getMyEnrollments() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(email).orElseThrow();
        var student = (Student) user;

        return enrollmentRepository.findByStudentId(student.getId())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDtoResponse> getEnrollmentsByProgram(Integer programId) {
        return enrollmentRepository.findByProgramId(programId)
                .stream()
                .map(this::convertToDto)
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

        return convertToDto(enrollmentRepository.save(enrollment));
    }

    private EnrollmentDtoResponse convertToDto(Enrollment enrollment) {
        EnrollmentDtoResponse dto = new EnrollmentDtoResponse();
        dto.setId(enrollment.getId());
        dto.setStatus(enrollment.getStatus());
        dto.setCreatedDate(enrollment.getCreatedDate());
        dto.setSubmissionDate(enrollment.getSubmissionDate());
        dto.setValidationDate(enrollment.getValidationDate());
        //dto.setStepCompleted(enrollment.getStepCompleted());

        if (enrollment.getPersonalInfo() != null) {
            dto.setPersonalInfo(convertPersonalInfoToDto(enrollment.getPersonalInfo()));
        }

        if (enrollment.getAcademicInfo() != null) {
            dto.setAcademicInfo(convertAcademicInfoToDto(enrollment.getAcademicInfo()));
        }

        dto.setProgramId(enrollment.getProgram().getId());
        dto.setStudentId(enrollment.getStudent().getId());

        return dto;
    }

    private PersonalInfoDto convertPersonalInfoToDto(PersonalInfo personalInfo) {
        PersonalInfoDto dto = new PersonalInfoDto();
        dto.setFirstName(personalInfo.getFirstName());
        dto.setLastName(personalInfo.getLastName());
        //dto.setDateOfBirth(personalInfo.getDateOfBirth());
        dto.setAddress(personalInfo.getAddress());
        dto.setPhoneNumber(personalInfo.getPhoneNumber());
        return dto;
    }

    private AcademicInfoDto convertAcademicInfoToDto(AcademicInfo academicInfo) {
        AcademicInfoDto dto = new AcademicInfoDto();
        dto.setPreviousSchool(academicInfo.getPreviousSchool());
        dto.setDiploma(academicInfo.getDiploma());
        dto.setGraduationYear(academicInfo.getGraduationYear());
        return dto;
    }
}