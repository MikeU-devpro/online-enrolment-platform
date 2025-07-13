package com.team48.inscriptionscolaire.enrollment;

import com.team48.inscriptionscolaire.document.Document;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EnrollmentDtoResponse {
    private Integer id;
    private Integer programId;
    private String programName;
    private StatusSubmission status;
    private LocalDateTime creationDate;
    private LocalDateTime submissionDate;
    private LocalDateTime validationDate;
    private int currentStep;
    private PersonalInfoDto personalInfo;
    private AcademicInfoDto academicInfo;
    private List<Document> documents;
}