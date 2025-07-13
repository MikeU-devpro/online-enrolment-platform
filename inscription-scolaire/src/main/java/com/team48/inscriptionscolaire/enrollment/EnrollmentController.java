package com.team48.inscriptionscolaire.enrollment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping
    public EnrollmentDtoResponse startOrUpdateEnrollment(@RequestBody EnrollmentDtoRequest enrollmentDtoRequest) {
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
        dto.setDocuments(files);
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
    public EnrollmentDtoResponse validateEnrollment(@PathVariable Integer enrollmentId) {
        return enrollmentService.validateEnrollment(enrollmentId);
    }
}