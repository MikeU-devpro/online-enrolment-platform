package com.team48.inscriptionscolaire.enrollment;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('STUDENT')")
    public EnrollmentDtoResponse startOrUpdateEnrollment(
            @RequestPart("enrollment") EnrollmentDtoRequest enrollmentDtoRequest,
            @RequestPart(value = "documentFiles", required = false) List<MultipartFile> documentFiles) {

        enrollmentDtoRequest.setDocumentFiles(documentFiles);
        return enrollmentService.startEnrollment(enrollmentDtoRequest);
    }

    @GetMapping("/{enrollmentId}")
    public EnrollmentDtoResponse getEnrollment(@PathVariable Integer enrollmentId) {
        return enrollmentService.getEnrollmentById(enrollmentId);
    }

    @PostMapping("/{enrollmentId}/documents")
    public EnrollmentDtoResponse uploadDocuments(
            @PathVariable Integer enrollmentId,
            @RequestParam("files") List<MultipartFile> files) {
        EnrollmentDtoRequest dto = new EnrollmentDtoRequest();
        dto.setCurrentStep(3);
        dto.setDocumentFiles(files);
        return enrollmentService.startEnrollment(dto);
    }

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