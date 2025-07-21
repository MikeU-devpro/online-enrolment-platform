package com.team48.inscriptionscolaire.enrollment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class EnrollmentDtoRequest {
    private Integer programId;
    private String academicYear;
    private int currentStep;
    private PersonalInfoDto personalInfo;
    private AcademicInfoDto academicInfo;
    private ContactDetailsDto contactDetails;

    @Schema(type = "array", format = "binary")
    private transient List<MultipartFile> documentFiles;
}