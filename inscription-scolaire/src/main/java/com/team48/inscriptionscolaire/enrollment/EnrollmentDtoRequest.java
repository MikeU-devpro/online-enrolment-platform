package com.team48.inscriptionscolaire.enrollment;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class EnrollmentDtoRequest {
    private Integer programId;
    private int currentStep;
    private PersonalInfoDto personalInfo;
    private AcademicInfoDto academicInfo;
    private List<MultipartFile> documents;
}