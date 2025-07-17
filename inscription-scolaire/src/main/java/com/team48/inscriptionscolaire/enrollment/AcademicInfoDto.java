package com.team48.inscriptionscolaire.enrollment;

import lombok.Data;

import java.util.Date;

@Data
public class AcademicInfoDto {
    private String previousSchool;
    private String diploma;
    private Double averageGrade;
    private Date graduationYear;
    // other academic fields
}