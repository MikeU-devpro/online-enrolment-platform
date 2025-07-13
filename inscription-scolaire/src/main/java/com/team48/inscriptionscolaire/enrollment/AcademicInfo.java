package com.team48.inscriptionscolaire.enrollment;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class AcademicInfo {
    private String previousSchool;
    private String diploma;
    private Double averageGrade;
    // other academic fields
}