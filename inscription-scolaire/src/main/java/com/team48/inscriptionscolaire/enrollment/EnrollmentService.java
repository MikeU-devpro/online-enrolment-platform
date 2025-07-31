package com.team48.inscriptionscolaire.enrollment;

import com.team48.inscriptionscolaire.document.Document;
import com.team48.inscriptionscolaire.document.DocumentService;
import com.team48.inscriptionscolaire.document.FileUploadConfig;
import com.team48.inscriptionscolaire.program.ProgramRepository;
import com.team48.inscriptionscolaire.student.Student;
import com.team48.inscriptionscolaire.user.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private final FileUploadConfig fileUploadConfig;
    private final ObjectMapper objectMapper;

    // NOUVEAU : Gère les étapes de l'inscription SANS les fichiers
    @Transactional
    public EnrollmentDtoResponse createOrUpdateEnrollment(EnrollmentDtoRequest dto) {
        // Logique pour trouver ou créer l'inscription
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var student = (Student) userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        var program = programRepository.findById(dto.getProgramId())
                .orElseThrow(() -> new EntityNotFoundException("Program not found"));

        var enrollment = enrollmentRepository
                .findByStudentIdAndProgramIdAndAcademicYear(student.getId(), program.getId(), dto.getAcademicYear())
                .orElseGet(() -> {
                    var newEnrollment = new Enrollment();
                    newEnrollment.setStudent(student);
                    newEnrollment.setProgram(program);
                    newEnrollment.setAcademicYear(dto.getAcademicYear());
                    newEnrollment.setStatus(StatusSubmission.IN_PROGRESS);
                    newEnrollment.setCreatedDate(LocalDateTime.now());
                    return newEnrollment;
                });

        // Met à jour l'inscription en fonction de l'étape (sauf pour les documents)
        switch (dto.getCurrentStep()) {
            case 1:
                updatePersonalInfo(enrollment, dto.getPersonalInfo()); break;
            case 3:
                updateAcademicInfo(enrollment, dto.getAcademicInfo()); break;
            case 4:
                updateContactDetails(enrollment, dto.getContactDetails()); break;
            case 5:
                completeEnrollment(enrollment); break;
        }

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return convertToDto(savedEnrollment);
    }

    // NOUVEAU : Gère uniquement l'ajout de documents à une inscription existante
    @Transactional
    public void addDocumentsToEnrollment(Integer enrollmentId, List<MultipartFile> documentFiles) {
        if (documentFiles == null || documentFiles.isEmpty()) {
            throw new IllegalArgumentException("Documents are required");
        }

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found with id: " + enrollmentId));

        try {
            List<Document> savedDocuments = new ArrayList<>();
            for (MultipartFile file : documentFiles) {
                validateFile(file);
                Document document = documentService.saveDocument(file);
                document.setEnrollment(enrollment);
                savedDocuments.add(document);
            }
            if (enrollment.getDocuments() == null) {
                enrollment.setDocuments(new ArrayList<>());
            }
            enrollment.getDocuments().addAll(savedDocuments);
            enrollment.setStepCompleted(2);
            enrollmentRepository.save(enrollment);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload documents", e);
        }
    }


    public EnrollmentDtoRequest parseEnrollmentJson(String enrollmentJson) throws JsonProcessingException {
        return objectMapper.readValue(enrollmentJson, EnrollmentDtoRequest.class);
    }

    private void updateContactDetails(Enrollment enrollment, ContactDetailsDto contactDetailsDto) {
        ContactDetails contactDetails = new ContactDetails();
        contactDetails.setEmail(contactDetailsDto.getEmail());
        contactDetails.setPhoneNumber(contactDetailsDto.getPhoneNumber());
        contactDetails.setAddress(contactDetailsDto.getAddress());
        contactDetails.setPeopleToContact(contactDetailsDto.getPeopleToContact());
        enrollment.setContactDetails(contactDetails);
        enrollment.setStepCompleted(4);
    }

    private boolean isValidAcademicYear(String academicYear) {
        return academicYear.matches("\\d{4}-\\d{4}")
                && Integer.parseInt(academicYear.split("-")[1]) - Integer.parseInt(academicYear.split("-")[0]) == 1;
    }

    private void completeEnrollment(Enrollment enrollment) {
        if (enrollment.getStepCompleted() < 4) {
            throw new IllegalStateException("All steps must be completed before submission");
        }

        if (enrollment.getPersonalInfo() == null ||
                enrollment.getAcademicInfo() == null ||
                enrollment.getDocuments() == null ||
                enrollment.getContactDetails() == null ||
                enrollment.getDocuments().isEmpty()) {
            throw new IllegalStateException("All required information must be provided");
        }

        enrollment.setStatus(StatusSubmission.PENDING);
        enrollment.setSubmissionDate(LocalDateTime.now());
        enrollment.setStepCompleted(5);
    }

    private void updatePersonalInfo(Enrollment enrollment, PersonalInfoDto personalInfoDto) {
        PersonalInfo personalInfo = new PersonalInfo();
        personalInfo.setFirstName(personalInfoDto.getFirstName());
        personalInfo.setLastName(personalInfoDto.getLastName());
        personalInfo.setNationality(personalInfoDto.getNationality());
        enrollment.setPersonalInfo(personalInfo);
        enrollment.setStepCompleted(1);
    }

    private void updateAcademicInfo(Enrollment enrollment, AcademicInfoDto academicInfoDto) {
        AcademicInfo academicInfo = new AcademicInfo();
        academicInfo.setPreviousSchool(academicInfoDto.getPreviousSchool());
        academicInfo.setDiploma(academicInfoDto.getDiploma());
        academicInfo.setGraduationYear(academicInfoDto.getGraduationYear());
        enrollment.setAcademicInfo(academicInfo);
        enrollment.setStepCompleted(3);
    }

   /* private void handleDocumentUpload(Enrollment enrollment, List<MultipartFile> documentFiles) {
        if (documentFiles == null || documentFiles.isEmpty()) {
            throw new IllegalArgumentException("Documents are required for this step");
        }

        try {
            List<Document> savedDocuments = new ArrayList<>();
            for (MultipartFile file : documentFiles) {
                validateFile(file);
                Document document = documentService.saveDocument(file); // Retourne l'entité Document sauvegardée
                document.setEnrollment(enrollment);
                savedDocuments.add(document);
            }
            enrollment.setDocuments(savedDocuments); // Associe les entités Document
            enrollment.setStepCompleted(2);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload documents", e);
        }
    }*/

    private void validateFile(MultipartFile file) {
        if (!fileUploadConfig.getAllowedFileTypes().contains(file.getContentType())) {
            throw new IllegalArgumentException(
                    "Type de fichier non autorisé. Types acceptés: " +
                            String.join(", ", fileUploadConfig.getAllowedFileTypes())
            );
        }

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!fileUploadConfig.getAllowedExtensions().contains(extension.toLowerCase())) {
            throw new IllegalArgumentException(
                    "Extension non autorisée. Extensions acceptées: " +
                            String.join(", ", fileUploadConfig.getAllowedExtensions())
            );
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

    public List<EnrollmentDtoResponse> getEnrollmentsByYear(String academicYear) {
        return enrollmentRepository.findByAcademicYear(academicYear)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDtoResponse> getEnrollmentsByProgramAndYear(Integer programId, String academicYear) {
        return enrollmentRepository.findByProgramIdAndAcademicYear(programId, academicYear)
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
        dto.setAcademicYear(enrollment.getAcademicYear());

        if (enrollment.getPersonalInfo() != null) {
            dto.setPersonalInfo(convertPersonalInfoToDto(enrollment.getPersonalInfo()));
        }

        if (enrollment.getAcademicInfo() != null) {
            dto.setAcademicInfo(convertAcademicInfoToDto(enrollment.getAcademicInfo()));
        }

        if (enrollment.getContactDetails() != null) {
            dto.setContactDetails(convertContactDetailsToDto(enrollment.getContactDetails()));
        }

        dto.setProgramId(enrollment.getProgram().getId());
        dto.setStudentId(enrollment.getStudent().getId());

        return dto;
    }

    private PersonalInfoDto convertPersonalInfoToDto(PersonalInfo personalInfo) {
        PersonalInfoDto dto = new PersonalInfoDto();
        dto.setFirstName(personalInfo.getFirstName());
        dto.setLastName(personalInfo.getLastName());
        return dto;
    }

    private AcademicInfoDto convertAcademicInfoToDto(AcademicInfo academicInfo) {
        AcademicInfoDto dto = new AcademicInfoDto();
        dto.setPreviousSchool(academicInfo.getPreviousSchool());
        dto.setDiploma(academicInfo.getDiploma());
        dto.setGraduationYear(academicInfo.getGraduationYear());
        return dto;
    }

    private ContactDetailsDto convertContactDetailsToDto(ContactDetails contactDetails) {
        ContactDetailsDto dto = new ContactDetailsDto();
        dto.setEmail(contactDetails.getEmail());
        dto.setPhoneNumber(contactDetails.getPhoneNumber());
        dto.setAddress(contactDetails.getAddress());
        dto.setPeopleToContact(contactDetails.getPeopleToContact());
        return dto;
    }

}