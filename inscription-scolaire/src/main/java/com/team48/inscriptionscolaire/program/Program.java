package com.team48.inscriptionscolaire.program;

import com.team48.inscriptionscolaire.common.BaseEntity;
import com.team48.inscriptionscolaire.enrollment.Enrollment;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Program extends BaseEntity {
    private String programName;

    @Column(unique = true)
    private String programCode;

    private String description;
    private double registrationFee;

    @Column(nullable = false)
    private int maxCapacity;

    private LocalDate registrationStartDate;
    private LocalDate registrationEndDate;

    @OneToMany(mappedBy = "program")
    private List<Enrollment> enrollmentList;

}
