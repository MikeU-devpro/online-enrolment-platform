package com.team48.inscriptionscolaire.enrollment;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class EnrollmentStepDto {
    private int currentStep;
    private PersonalInfoDto personalInfo;
    private List<MultipartFile> documents;
    private ContactDetailsDto contactDetailsDto;
    private AcademicInfoDto academicInfo;


}