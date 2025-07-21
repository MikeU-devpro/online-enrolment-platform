package com.team48.inscriptionscolaire.enrollment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Schema(description = "Enrollment request with documents")
public class EnrollmentWithDocumentsRequest {
    @Schema(description = "Enrollment data as JSON string")
    private String enrollmentData;

    @Schema(description = "List of documents",
            type = "array",
            format = "binary")
    private List<MultipartFile> documents;
}
