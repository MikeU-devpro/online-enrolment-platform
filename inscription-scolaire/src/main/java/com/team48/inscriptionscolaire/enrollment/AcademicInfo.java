package com.team48.inscriptionscolaire.enrollment;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Date;

@Embeddable
@Data
public class AcademicInfo {
    private String previousSchool;
    private String diploma;
    private Double averageGrade;
    private Date graduationYear;
    // other academic fields
}