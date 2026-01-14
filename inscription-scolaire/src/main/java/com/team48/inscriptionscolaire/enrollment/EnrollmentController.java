package com.team48.inscriptionscolaire.enrollment;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    // NOUVEAU : Endpoint pour créer/mettre à jour les données de l'inscription (sans fichiers)
    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EnrollmentDtoResponse> createOrUpdateEnrollment(@RequestBody EnrollmentDtoRequest enrollmentDtoRequest) {
        EnrollmentDtoResponse response = enrollmentService.createOrUpdateEnrollment(enrollmentDtoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // MODIFIÉ : Endpoint dédié uniquement au téléversement de documents
    @PostMapping(value = "/{enrollmentId}/documents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> uploadDocuments(
            @PathVariable Integer enrollmentId,
            @RequestParam("documents") List<MultipartFile> documents) {
        enrollmentService.addDocumentsToEnrollment(enrollmentId, documents);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{enrollmentId}")
    public EnrollmentDtoResponse getEnrollment(@PathVariable Integer enrollmentId) {
        return enrollmentService.getEnrollmentById(enrollmentId);
    }

    /*@PostMapping("/{enrollmentId}/documents")
    public EnrollmentDtoResponse uploadDocuments(
            @PathVariable Integer enrollmentId,
            @RequestParam("files") List<MultipartFile> files) {
        EnrollmentDtoRequest dto = new EnrollmentDtoRequest();
        dto.setCurrentStep(3);
        dto.setDocumentFiles(files);
        return enrollmentService.startEnrollment(dto);
    }*/

    @GetMapping("/my-enrollments")
    public List<EnrollmentDtoResponse> getMyEnrollments() {
        return enrollmentService.getMyEnrollments();
    }

    @GetMapping("/program/{programId}")
    public List<EnrollmentDtoResponse> getEnrollmentsByProgram(@PathVariable Integer programId) {
        return enrollmentService.getEnrollmentsByProgram(programId);
    }

    @PatchMapping("/{enrollmentId}/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public EnrollmentDtoResponse validateEnrollment(@PathVariable Integer enrollmentId) {
        return enrollmentService.validateEnrollment(enrollmentId);
    }

    @GetMapping("/year/{academicYear}")
    public List<EnrollmentDtoResponse> getEnrollmentsByYear(@PathVariable String academicYear) {
        return enrollmentService.getEnrollmentsByYear(academicYear);
    }

    @GetMapping("/program/{programId}/year/{academicYear}")
    public List<EnrollmentDtoResponse> getEnrollmentsByProgramAndYear(
            @PathVariable Integer programId,
            @PathVariable String academicYear) {
        return enrollmentService.getEnrollmentsByProgramAndYear(programId, academicYear);
    }

    @GetMapping("/available-academic-years")
    public List<String> getAvailableAcademicYears() {
        int currentYear = LocalDate.now().getYear();
        List<String> years = new ArrayList<>();

        // Génère les 3 prochaines années académiques
        for (int i = 0; i < 3; i++) {
            years.add((currentYear + i) + "-" + (currentYear + i + 1));
        }

        return years;
    }
}